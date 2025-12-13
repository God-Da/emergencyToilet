package com.emergency.backend.service;

import com.emergency.backend.domain.Toilet;
import com.emergency.backend.dto.ToiletResponseDto;
import com.emergency.backend.repository.ToiletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ToiletService {
    
    @Autowired
    private ToiletRepository toiletRepository;
    
    /**
     * 주변 화장실 검색
     * @param latitude 현재 위도
     * @param longitude 현재 경도
     * @param radiusKm 반경 (km, 기본값 5km)
     * @return 주변 화장실 목록 (거리순 정렬)
     */
    public List<ToiletResponseDto> findNearbyToilets(Double latitude, Double longitude, Double radiusKm) {
        final double finalRadiusKm = (radiusKm == null) ? 5.0 : radiusKm; // 기본 반경 5km
        
        // 위도/경도 범위 계산 (대략적인 필터링)
        // 1도 위도 ≈ 111km, 경도는 위도에 따라 다름
        double latRange = finalRadiusKm / 111.0;
        double lngRange = finalRadiusKm / (111.0 * Math.cos(Math.toRadians(latitude)));
        
        Double minLat = latitude - latRange;
        Double maxLat = latitude + latRange;
        Double minLng = longitude - lngRange;
        Double maxLng = longitude + lngRange;
        
        // 범위 내 화장실 조회
        List<Toilet> toilets = toiletRepository.findToiletsInRange(minLat, maxLat, minLng, maxLng);
        
        // 정확한 거리 계산 및 필터링
        return toilets.stream()
                .map(toilet -> {
                    double distance = calculateDistance(latitude, longitude, 
                                                       toilet.getLatitude(), toilet.getLongitude());
                    
                    // 반경 내 화장실만 포함
                    if (distance <= finalRadiusKm) {
                        ToiletResponseDto dto = new ToiletResponseDto();
                        dto.setId(toilet.getId());
                        dto.setName(toilet.getName());
                        dto.setRoadAddress(toilet.getRoadAddress());
                        dto.setLotAddress(toilet.getLotAddress());
                        dto.setLatitude(toilet.getLatitude());
                        dto.setLongitude(toilet.getLongitude());
                        dto.setOpenTime(toilet.getOpenTime());
                        dto.setDistance(distance);
                        return dto;
                    }
                    return null;
                })
                .filter(dto -> dto != null)
                .sorted((a, b) -> Double.compare(a.getDistance(), b.getDistance()))
                .collect(Collectors.toList());
    }
    
    /**
     * 주소 기반 화장실 검색
     * @param address 검색할 주소 (도로명 주소, 지번 주소, 또는 화장실 이름)
     * @return 주소나 이름이 포함된 화장실 목록
     */
    public List<ToiletResponseDto> findByAddress(String address) {
        if (address == null || address.trim().isEmpty()) {
            return List.of();
        }
        
        String searchTerm = address.trim();
        System.out.println("검색어: " + searchTerm);
        
        List<Toilet> toilets = toiletRepository.findByAddress(searchTerm);
        System.out.println("검색 결과 개수: " + toilets.size());
        
        if (toilets.isEmpty()) {
            System.out.println("검색 결과가 없습니다. 검색어: " + searchTerm);
        }
        
        return toilets.stream().map(toilet -> {
            ToiletResponseDto dto = new ToiletResponseDto();
            dto.setId(toilet.getId());
            dto.setName(toilet.getName());
            dto.setRoadAddress(toilet.getRoadAddress());
            dto.setLotAddress(toilet.getLotAddress());
            dto.setLatitude(toilet.getLatitude());
            dto.setLongitude(toilet.getLongitude());
            dto.setOpenTime(toilet.getOpenTime());
            dto.setDistance(null); // 주소 검색은 거리 정보 없음
            return dto;
        }).collect(Collectors.toList());
    }
    
    /**
     * 모든 화장실 조회 (테스트용)
     * @return 모든 화장실 목록
     */
    public List<ToiletResponseDto> findAll() {
        List<Toilet> toilets = toiletRepository.findAll();
        
        return toilets.stream().map(toilet -> {
            ToiletResponseDto dto = new ToiletResponseDto();
            dto.setId(toilet.getId());
            dto.setName(toilet.getName());
            dto.setRoadAddress(toilet.getRoadAddress());
            dto.setLotAddress(toilet.getLotAddress());
            dto.setLatitude(toilet.getLatitude());
            dto.setLongitude(toilet.getLongitude());
            dto.setOpenTime(toilet.getOpenTime());
            dto.setDistance(null);
            return dto;
        }).collect(Collectors.toList());
    }
    
    /**
     * 두 지점 간의 거리 계산 (하버사인 공식)
     * @param lat1 첫 번째 지점의 위도
     * @param lon1 첫 번째 지점의 경도
     * @param lat2 두 번째 지점의 위도
     * @param lon2 두 번째 지점의 경도
     * @return 거리 (km)
     */
    private Double calculateDistance(Double lat1, Double lon1, Double lat2, Double lon2) {
        final int R = 6371; // 지구 반경 (km)
        
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        
        return R * c;
    }
}


package com.emergency.backend.repository;

import com.emergency.backend.domain.Toilet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ToiletRepository extends JpaRepository<Toilet, Long> {
    
    /**
     * 주변 화장실 검색 (반경 km 내)
     * 위도/경도 범위로 대략적인 필터링 후 Service에서 정확한 거리 계산
     * @param minLat 최소 위도
     * @param maxLat 최대 위도
     * @param minLng 최소 경도
     * @param maxLng 최대 경도
     * @return 범위 내 화장실 목록
     */
    @Query(value = "SELECT * FROM toilet " +
            "WHERE latitude BETWEEN :minLat AND :maxLat " +
            "AND longitude BETWEEN :minLng AND :maxLng",
            nativeQuery = true)
    List<Toilet> findToiletsInRange(@Param("minLat") Double minLat,
                                    @Param("maxLat") Double maxLat,
                                    @Param("minLng") Double minLng,
                                    @Param("maxLng") Double maxLng);
    
    /**
     * 주소 기반 화장실 검색 (도로명 주소, 지번 주소, 화장실 이름)
     * @param address 검색할 주소 (부분 일치)
     * @return 주소나 이름이 포함된 화장실 목록
     */
    @Query(value = "SELECT * FROM toilet " +
            "WHERE (road_address LIKE CONCAT('%', :address, '%') " +
            "OR lot_address LIKE CONCAT('%', :address, '%') " +
            "OR name LIKE CONCAT('%', :address, '%')) " +
            "AND (road_address IS NOT NULL OR lot_address IS NOT NULL OR name IS NOT NULL)",
            nativeQuery = true)
    List<Toilet> findByAddress(@Param("address") String address);
}


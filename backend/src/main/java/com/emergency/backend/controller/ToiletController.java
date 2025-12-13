package com.emergency.backend.controller;

import com.emergency.backend.dto.ToiletResponseDto;
import com.emergency.backend.dto.ToiletWithReviewsDto;
import com.emergency.backend.dto.UserResponseDto;
import com.emergency.backend.service.BookmarkService;
import com.emergency.backend.service.ReviewService;
import com.emergency.backend.service.ToiletService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/toilets")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ToiletController {
    
    @Autowired
    private ToiletService toiletService;
    
    @Autowired
    private ReviewService reviewService;
    
    @Autowired
    private BookmarkService bookmarkService;
    
    /**
     * 주변 화장실 검색 API
     * @param latitude 현재 위도
     * @param longitude 현재 경도
     * @param radius 반경 (km, 선택사항, 기본값 5km)
     * @return 주변 화장실 목록
     */
    @GetMapping("/nearby")
    public ResponseEntity<List<ToiletResponseDto>> getNearbyToilets(
            @RequestParam Double latitude,
            @RequestParam Double longitude,
            @RequestParam(required = false) Double radius) {
        
        try {
            List<ToiletResponseDto> toilets = toiletService.findNearbyToilets(latitude, longitude, radius);
            return ResponseEntity.ok(toilets);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
    
    /**
     * 주소 기반 화장실 검색 API (리뷰 정보 포함)
     * @param address 검색할 주소 (도로명 주소 또는 지번 주소)
     * @param session HTTP 세션
     * @return 주소가 포함된 화장실 목록 (리뷰 정보 포함)
     */
    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchToiletsByAddress(
            @RequestParam String address,
            HttpSession session) {
        
        Map<String, Object> response = new HashMap<>();
        try {
            List<ToiletResponseDto> toilets = toiletService.findByAddress(address);
            
            // 세션에서 사용자 정보 가져오기
            UserResponseDto user = (UserResponseDto) session.getAttribute("user");
            Long userId = user != null ? user.getId() : null;
            
            // 각 화장실에 리뷰 정보와 찜 여부 추가
            List<ToiletWithReviewsDto> toiletsWithReviews = new ArrayList<>();
            for (ToiletResponseDto toilet : toilets) {
                ToiletWithReviewsDto dto = new ToiletWithReviewsDto();
                dto.setId(toilet.getId());
                dto.setName(toilet.getName());
                dto.setRoadAddress(toilet.getRoadAddress());
                dto.setLotAddress(toilet.getLotAddress());
                dto.setLatitude(toilet.getLatitude());
                dto.setLongitude(toilet.getLongitude());
                dto.setOpenTime(toilet.getOpenTime());
                
                // 리뷰 정보 추가
                dto.setAverageRating(reviewService.getAverageRating(toilet.getId()));
                dto.setReviewCount(reviewService.getReviewCount(toilet.getId()));
                dto.setRecentReviews(reviewService.getRecentToiletReviews(toilet.getId(), 2));
                
                // 찜 개수 추가
                dto.setBookmarkCount(bookmarkService.getBookmarkCount(toilet.getId()));
                
                // 찜 여부 확인 (로그인한 경우만)
                if (userId != null) {
                    dto.setIsBookmarked(bookmarkService.isBookmarked(userId, toilet.getId()));
                } else {
                    dto.setIsBookmarked(false);
                }
                
                toiletsWithReviews.add(dto);
            }
            
            response.put("success", true);
            response.put("data", toiletsWithReviews);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("주소 검색 에러: " + e.getMessage());
            response.put("success", false);
            response.put("data", new ArrayList<>());
            return ResponseEntity.ok(response);
        }
    }
    
    /**
     * 모든 화장실 조회 (테스트용)
     * @return 모든 화장실 목록
     */
    @GetMapping("/all")
    public ResponseEntity<List<ToiletResponseDto>> getAllToilets() {
        try {
            List<ToiletResponseDto> toilets = toiletService.findAll();
            return ResponseEntity.ok(toilets);
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("전체 조회 에러: " + e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
}


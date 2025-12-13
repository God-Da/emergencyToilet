package com.emergency.backend.controller;

import com.emergency.backend.dto.ReviewRequestDto;
import com.emergency.backend.dto.ReviewResponseDto;
import com.emergency.backend.dto.ReviewWithToiletDto;
import com.emergency.backend.dto.UserResponseDto;
import com.emergency.backend.service.ReviewService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ReviewController {
    
    @Autowired
    private ReviewService reviewService;
    
    /**
     * 리뷰 작성 API (로그인 필요)
     * @param toiletId 화장실 ID
     * @param reviewRequest 리뷰 요청
     * @param session HTTP 세션
     * @return 생성된 리뷰 정보
     */
    @PostMapping("/toilet/{toiletId}")
    public ResponseEntity<Map<String, Object>> createReview(
            @PathVariable Long toiletId,
            @RequestBody ReviewRequestDto reviewRequest,
            HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        
        // 로그인 확인
        UserResponseDto user = (UserResponseDto) session.getAttribute("user");
        if (user == null) {
            response.put("success", false);
            response.put("message", "로그인이 필요합니다.");
            return ResponseEntity.status(401).body(response);
        }
        
        try {
            ReviewResponseDto review = reviewService.createReview(user.getId(), toiletId, reviewRequest);
            response.put("success", true);
            response.put("message", "리뷰가 등록되었습니다.");
            response.put("data", review);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "리뷰 등록에 실패했습니다.");
            return ResponseEntity.internalServerError().body(response);
        }
    }
    
    /**
     * 리뷰 수정 API (로그인 필요, 본인만)
     * @param reviewId 리뷰 ID
     * @param reviewRequest 수정 요청
     * @param session HTTP 세션
     * @return 수정된 리뷰 정보
     */
    @PutMapping("/{reviewId}")
    public ResponseEntity<Map<String, Object>> updateReview(
            @PathVariable Long reviewId,
            @RequestBody ReviewRequestDto reviewRequest,
            HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        
        // 로그인 확인
        UserResponseDto user = (UserResponseDto) session.getAttribute("user");
        if (user == null) {
            response.put("success", false);
            response.put("message", "로그인이 필요합니다.");
            return ResponseEntity.status(401).body(response);
        }
        
        try {
            ReviewResponseDto review = reviewService.updateReview(reviewId, user.getId(), reviewRequest);
            response.put("success", true);
            response.put("message", "리뷰가 수정되었습니다.");
            response.put("data", review);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "리뷰 수정에 실패했습니다.");
            return ResponseEntity.internalServerError().body(response);
        }
    }
    
    /**
     * 리뷰 삭제 API (로그인 필요, 본인만)
     * @param reviewId 리뷰 ID
     * @param session HTTP 세션
     * @return 삭제 결과
     */
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Map<String, Object>> deleteReview(
            @PathVariable Long reviewId,
            HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        
        // 로그인 확인
        UserResponseDto user = (UserResponseDto) session.getAttribute("user");
        if (user == null) {
            response.put("success", false);
            response.put("message", "로그인이 필요합니다.");
            return ResponseEntity.status(401).body(response);
        }
        
        try {
            reviewService.deleteReview(reviewId, user.getId());
            response.put("success", true);
            response.put("message", "리뷰가 삭제되었습니다.");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "리뷰 삭제에 실패했습니다.");
            return ResponseEntity.internalServerError().body(response);
        }
    }
    
    /**
     * 화장실의 리뷰 목록 조회 API (모두 볼 수 있음)
     * @param toiletId 화장실 ID
     * @return 리뷰 목록
     */
    @GetMapping("/toilet/{toiletId}")
    public ResponseEntity<Map<String, Object>> getToiletReviews(@PathVariable Long toiletId) {
        Map<String, Object> response = new HashMap<>();
        try {
            List<ReviewResponseDto> reviews = reviewService.getToiletReviews(toiletId);
            Double averageRating = reviewService.getAverageRating(toiletId);
            Long reviewCount = reviewService.getReviewCount(toiletId);
            
            response.put("success", true);
            response.put("data", reviews);
            response.put("averageRating", averageRating);
            response.put("reviewCount", reviewCount);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "리뷰 목록 조회에 실패했습니다.");
            return ResponseEntity.internalServerError().body(response);
        }
    }
    
    /**
     * 화장실의 최근 리뷰 조회 API (1-2개, 모두 볼 수 있음)
     * @param toiletId 화장실 ID
     * @param limit 개수 제한 (기본값 2)
     * @return 최근 리뷰 목록
     */
    @GetMapping("/toilet/{toiletId}/recent")
    public ResponseEntity<Map<String, Object>> getRecentToiletReviews(
            @PathVariable Long toiletId,
            @RequestParam(defaultValue = "2") int limit) {
        Map<String, Object> response = new HashMap<>();
        try {
            List<ReviewResponseDto> reviews = reviewService.getRecentToiletReviews(toiletId, limit);
            Double averageRating = reviewService.getAverageRating(toiletId);
            Long reviewCount = reviewService.getReviewCount(toiletId);
            
            response.put("success", true);
            response.put("data", reviews);
            response.put("averageRating", averageRating);
            response.put("reviewCount", reviewCount);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "리뷰 조회에 실패했습니다.");
            return ResponseEntity.internalServerError().body(response);
        }
    }
    
    /**
     * 사용자의 리뷰 목록 조회 API (로그인 필요)
     * @param session HTTP 세션
     * @return 리뷰 목록 (화장실 정보 포함)
     */
    @GetMapping("/my")
    public ResponseEntity<Map<String, Object>> getMyReviews(HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        
        // 로그인 확인
        UserResponseDto user = (UserResponseDto) session.getAttribute("user");
        if (user == null) {
            response.put("success", false);
            response.put("message", "로그인이 필요합니다.");
            return ResponseEntity.status(401).body(response);
        }
        
        try {
            List<ReviewWithToiletDto> reviews = reviewService.getUserReviews(user.getId());
            response.put("success", true);
            response.put("data", reviews);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "리뷰 목록 조회에 실패했습니다.");
            return ResponseEntity.internalServerError().body(response);
        }
    }
}


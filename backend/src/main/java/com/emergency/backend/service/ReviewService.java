package com.emergency.backend.service;

import com.emergency.backend.domain.Review;
import com.emergency.backend.domain.Toilet;
import com.emergency.backend.domain.User;
import com.emergency.backend.dto.ReviewRequestDto;
import com.emergency.backend.dto.ReviewResponseDto;
import com.emergency.backend.dto.ReviewWithToiletDto;
import com.emergency.backend.repository.ReviewRepository;
import com.emergency.backend.repository.ToiletRepository;
import com.emergency.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewService {
    
    @Autowired
    private ReviewRepository reviewRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ToiletRepository toiletRepository;
    
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
    
    /**
     * 리뷰 작성
     * @param userId 사용자 ID
     * @param toiletId 화장실 ID
     * @param reviewRequest 리뷰 요청
     * @return 생성된 리뷰 정보
     */
    @Transactional
    public ReviewResponseDto createReview(Long userId, Long toiletId, ReviewRequestDto reviewRequest) {
        // 별점 유효성 검사
        if (reviewRequest.getRating() < 1 || reviewRequest.getRating() > 5) {
            throw new RuntimeException("별점은 1점부터 5점까지 가능합니다.");
        }
        
        Review review = new Review();
        review.setUserId(userId);
        review.setToiletId(toiletId);
        review.setContent(reviewRequest.getContent());
        review.setRating(reviewRequest.getRating());
        review.setCreatedDate(LocalDateTime.now());
        
        Review savedReview = reviewRepository.save(review);
        
        return convertToDto(savedReview);
    }
    
    /**
     * 리뷰 수정
     * @param reviewId 리뷰 ID
     * @param userId 사용자 ID (작성자 확인용)
     * @param reviewRequest 수정 요청
     * @return 수정된 리뷰 정보
     */
    @Transactional
    public ReviewResponseDto updateReview(Long reviewId, Long userId, ReviewRequestDto reviewRequest) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("리뷰를 찾을 수 없습니다."));
        
        // 작성자 확인
        if (!review.getUserId().equals(userId)) {
            throw new RuntimeException("본인의 리뷰만 수정할 수 있습니다.");
        }
        
        // 별점 유효성 검사
        if (reviewRequest.getRating() < 1 || reviewRequest.getRating() > 5) {
            throw new RuntimeException("별점은 1점부터 5점까지 가능합니다.");
        }
        
        review.setContent(reviewRequest.getContent());
        review.setRating(reviewRequest.getRating());
        
        Review savedReview = reviewRepository.save(review);
        
        return convertToDto(savedReview);
    }
    
    /**
     * 리뷰 삭제
     * @param reviewId 리뷰 ID
     * @param userId 사용자 ID (작성자 확인용)
     */
    @Transactional
    public void deleteReview(Long reviewId, Long userId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("리뷰를 찾을 수 없습니다."));
        
        // 작성자 확인
        if (!review.getUserId().equals(userId)) {
            throw new RuntimeException("본인의 리뷰만 삭제할 수 있습니다.");
        }
        
        reviewRepository.delete(review);
    }
    
    /**
     * 화장실의 리뷰 목록 조회
     * @param toiletId 화장실 ID
     * @return 리뷰 목록
     */
    public List<ReviewResponseDto> getToiletReviews(Long toiletId) {
        List<Review> reviews = reviewRepository.findByToiletIdOrderByCreatedDateDesc(toiletId);
        
        return reviews.stream().map(this::convertToDto).collect(Collectors.toList());
    }
    
    /**
     * 화장실의 최근 리뷰 조회 (1-2개)
     * @param toiletId 화장실 ID
     * @param limit 개수 제한
     * @return 최근 리뷰 목록
     */
    public List<ReviewResponseDto> getRecentToiletReviews(Long toiletId, int limit) {
        List<Review> reviews = reviewRepository.findByToiletIdOrderByCreatedDateDesc(toiletId);
        
        return reviews.stream()
                .limit(limit)
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    /**
     * 사용자의 리뷰 목록 조회
     * @param userId 사용자 ID
     * @return 리뷰 목록 (화장실 정보 포함)
     */
    public List<ReviewWithToiletDto> getUserReviews(Long userId) {
        List<Review> reviews = reviewRepository.findByUserIdOrderByCreatedDateDesc(userId);
        
        return reviews.stream().map(review -> {
            User user = userRepository.findById(review.getUserId()).orElse(null);
            Toilet toilet = toiletRepository.findById(review.getToiletId()).orElse(null);
            
            ReviewWithToiletDto dto = new ReviewWithToiletDto();
            dto.setId(review.getId());
            dto.setUserId(review.getUserId());
            dto.setUsername(user != null ? user.getUsername() : "알 수 없음");
            dto.setToiletId(review.getToiletId());
            dto.setToiletName(toilet != null ? toilet.getName() : "알 수 없음");
            dto.setToiletRoadAddress(toilet != null ? toilet.getRoadAddress() : null);
            dto.setToiletLotAddress(toilet != null ? toilet.getLotAddress() : null);
            dto.setContent(review.getContent());
            dto.setRating(review.getRating());
            dto.setCreatedDate(review.getCreatedDate().format(DATE_FORMATTER));
            return dto;
        }).collect(Collectors.toList());
    }
    
    /**
     * 화장실의 평균 별점 조회
     * @param toiletId 화장실 ID
     * @return 평균 별점
     */
    public Double getAverageRating(Long toiletId) {
        Double avg = reviewRepository.getAverageRatingByToiletId(toiletId);
        return avg != null ? avg : 0.0;
    }
    
    /**
     * 화장실의 리뷰 개수 조회
     * @param toiletId 화장실 ID
     * @return 리뷰 개수
     */
    public Long getReviewCount(Long toiletId) {
        return reviewRepository.countByToiletId(toiletId);
    }
    
    /**
     * Review를 DTO로 변환
     */
    private ReviewResponseDto convertToDto(Review review) {
        User user = userRepository.findById(review.getUserId())
                .orElse(null);
        
        ReviewResponseDto dto = new ReviewResponseDto();
        dto.setId(review.getId());
        dto.setUserId(review.getUserId());
        dto.setUsername(user != null ? user.getUsername() : "알 수 없음");
        dto.setUserEmail(user != null ? user.getEmail() : null);
        dto.setToiletId(review.getToiletId());
        dto.setContent(review.getContent());
        dto.setRating(review.getRating());
        dto.setCreatedDate(review.getCreatedDate().format(DATE_FORMATTER));
        return dto;
    }
}


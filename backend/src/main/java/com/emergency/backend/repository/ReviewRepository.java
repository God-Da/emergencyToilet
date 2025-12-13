package com.emergency.backend.repository;

import com.emergency.backend.domain.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    
    /**
     * 화장실의 리뷰 목록 조회 (최신순)
     * @param toiletId 화장실 ID
     * @return 리뷰 목록
     */
    @Query("SELECT r FROM Review r WHERE r.toiletId = :toiletId ORDER BY r.createdDate DESC")
    List<Review> findByToiletIdOrderByCreatedDateDesc(@Param("toiletId") Long toiletId);
    
    /**
     * 사용자의 리뷰 목록 조회
     * @param userId 사용자 ID
     * @return 리뷰 목록
     */
    @Query("SELECT r FROM Review r WHERE r.userId = :userId ORDER BY r.createdDate DESC")
    List<Review> findByUserIdOrderByCreatedDateDesc(@Param("userId") Long userId);
    
    /**
     * 화장실의 평균 별점 계산
     * @param toiletId 화장실 ID
     * @return 평균 별점
     */
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.toiletId = :toiletId")
    Double getAverageRatingByToiletId(@Param("toiletId") Long toiletId);
    
    /**
     * 화장실의 리뷰 개수 조회
     * @param toiletId 화장실 ID
     * @return 리뷰 개수
     */
    @Query("SELECT COUNT(r) FROM Review r WHERE r.toiletId = :toiletId")
    Long countByToiletId(@Param("toiletId") Long toiletId);
}


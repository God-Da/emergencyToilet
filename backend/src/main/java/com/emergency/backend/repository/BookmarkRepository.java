package com.emergency.backend.repository;

import com.emergency.backend.domain.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    
    /**
     * 사용자의 찜 목록 조회
     * @param userId 사용자 ID
     * @return 찜 목록
     */
    @Query("SELECT b FROM Bookmark b WHERE b.userId = :userId ORDER BY b.createdDate DESC")
    List<Bookmark> findByUserId(@Param("userId") Long userId);
    
    /**
     * 특정 화장실을 찜했는지 확인
     * @param userId 사용자 ID
     * @param toiletId 화장실 ID
     * @return 찜 정보
     */
    Optional<Bookmark> findByUserIdAndToiletId(Long userId, Long toiletId);
    
    /**
     * 화장실의 찜 개수 조회
     * @param toiletId 화장실 ID
     * @return 찜 개수
     */
    @Query("SELECT COUNT(b) FROM Bookmark b WHERE b.toiletId = :toiletId")
    Long countByToiletId(@Param("toiletId") Long toiletId);
    
    /**
     * 화장실의 찜 개수 조회 (네이티브 쿼리)
     * @param toiletId 화장실 ID
     * @return 찜 개수
     */
    @Query(value = "SELECT COUNT(*) FROM bookmark WHERE toilet_id = :toiletId", nativeQuery = true)
    Long countBookmarksByToiletId(@Param("toiletId") Long toiletId);
}


package com.emergency.backend.repository;

import com.emergency.backend.domain.Story;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoryRepository extends JpaRepository<Story, Long> {
    
    /**
     * 모든 재미있는 화장실 이야기를 최신순으로 조회
     * @return 최신순 이야기 목록
     */
    @Query("SELECT s FROM Story s ORDER BY s.createdDate DESC")
    List<Story> findAllOrderByCreatedDateDesc();
}


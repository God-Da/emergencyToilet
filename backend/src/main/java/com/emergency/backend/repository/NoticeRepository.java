package com.emergency.backend.repository;

import com.emergency.backend.domain.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {
    
    /**
     * 모든 공지사항을 최신순으로 조회
     * @return 최신순 공지사항 목록
     */
    @Query("SELECT n FROM Notice n ORDER BY n.createdDate DESC")
    List<Notice> findAllOrderByCreatedDateDesc();
}


package com.emergency.backend.repository;

import com.emergency.backend.domain.Qna;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QnaRepository extends JpaRepository<Qna, Long> {
    
    /**
     * 모든 Q&A를 최신순으로 조회
     * @return 최신순 Q&A 목록
     */
    @Query("SELECT q FROM Qna q ORDER BY q.createdDate DESC")
    List<Qna> findAllOrderByCreatedDateDesc();
}


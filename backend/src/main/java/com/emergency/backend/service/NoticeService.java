package com.emergency.backend.service;

import com.emergency.backend.domain.Notice;
import com.emergency.backend.dto.NoticeResponseDto;
import com.emergency.backend.repository.NoticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class NoticeService {
    
    @Autowired
    private NoticeRepository noticeRepository;
    
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    
    /**
     * 모든 공지사항 조회 (최신순)
     * @return 공지사항 목록
     */
    public List<NoticeResponseDto> findAll() {
        List<Notice> notices = noticeRepository.findAllOrderByCreatedDateDesc();
        
        return notices.stream().map(notice -> {
            NoticeResponseDto dto = new NoticeResponseDto();
            dto.setId(notice.getId());
            dto.setTitle(notice.getTitle());
            dto.setContent(notice.getContent());
            dto.setCreatedDate(notice.getCreatedDate().format(DATE_FORMATTER));
            dto.setViewCount(notice.getViewCount());
            return dto;
        }).collect(Collectors.toList());
    }
    
    /**
     * 공지사항 상세 조회
     * @param id 공지사항 ID
     * @return 공지사항 상세 정보
     */
    @Transactional
    public NoticeResponseDto findById(Long id) {
        Notice notice = noticeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("공지사항을 찾을 수 없습니다."));
        
        // 조회수 증가
        notice.setViewCount(notice.getViewCount() + 1);
        noticeRepository.save(notice);
        
        NoticeResponseDto dto = new NoticeResponseDto();
        dto.setId(notice.getId());
        dto.setTitle(notice.getTitle());
        dto.setContent(notice.getContent());
        dto.setCreatedDate(notice.getCreatedDate().format(DATE_FORMATTER));
        dto.setViewCount(notice.getViewCount());
        return dto;
    }
}


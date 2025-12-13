package com.emergency.backend.controller;

import com.emergency.backend.dto.NoticeResponseDto;
import com.emergency.backend.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notices")
@CrossOrigin(origins = "http://localhost:3000")
public class NoticeController {
    
    @Autowired
    private NoticeService noticeService;
    
    /**
     * 모든 공지사항 조회 API
     * @return 공지사항 목록
     */
    @GetMapping
    public ResponseEntity<List<NoticeResponseDto>> getAllNotices() {
        try {
            List<NoticeResponseDto> notices = noticeService.findAll();
            return ResponseEntity.ok(notices);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
    
    /**
     * 공지사항 상세 조회 API
     * @param id 공지사항 ID
     * @return 공지사항 상세 정보
     */
    @GetMapping("/{id}")
    public ResponseEntity<NoticeResponseDto> getNoticeById(@PathVariable Long id) {
        try {
            NoticeResponseDto notice = noticeService.findById(id);
            return ResponseEntity.ok(notice);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}


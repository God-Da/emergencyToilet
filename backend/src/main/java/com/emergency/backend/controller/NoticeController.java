package com.emergency.backend.controller;

import com.emergency.backend.dto.NoticeRequestDto;
import com.emergency.backend.dto.NoticeResponseDto;
import com.emergency.backend.dto.UserResponseDto;
import com.emergency.backend.service.NoticeService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notices")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
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
    
    /**
     * 공지사항 작성 API (admin만)
     * @param noticeRequest 공지사항 작성 요청
     * @param session HTTP 세션
     * @return 생성된 공지사항 정보
     */
    @PostMapping
    public ResponseEntity<Map<String, Object>> createNotice(
            @RequestBody NoticeRequestDto noticeRequest,
            HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        
        // admin 확인
        UserResponseDto user = (UserResponseDto) session.getAttribute("user");
        if (user == null || !"admin".equals(user.getUsername())) {
            response.put("success", false);
            response.put("message", "관리자만 공지사항을 작성할 수 있습니다.");
            return ResponseEntity.status(403).body(response);
        }
        
        try {
            NoticeResponseDto notice = noticeService.create(noticeRequest);
            response.put("success", true);
            response.put("message", "공지사항이 등록되었습니다.");
            response.put("data", notice);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "공지사항 등록에 실패했습니다.");
            return ResponseEntity.internalServerError().body(response);
        }
    }
    
    /**
     * 공지사항 삭제 API (admin만)
     * @param id 공지사항 ID
     * @param session HTTP 세션
     * @return 삭제 결과
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteNotice(
            @PathVariable Long id,
            HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        
        // admin 확인
        UserResponseDto user = (UserResponseDto) session.getAttribute("user");
        if (user == null || !"admin".equals(user.getUsername())) {
            response.put("success", false);
            response.put("message", "관리자만 공지사항을 삭제할 수 있습니다.");
            return ResponseEntity.status(403).body(response);
        }
        
        try {
            noticeService.delete(id);
            response.put("success", true);
            response.put("message", "공지사항이 삭제되었습니다.");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "공지사항 삭제에 실패했습니다.");
            return ResponseEntity.internalServerError().body(response);
        }
    }
}


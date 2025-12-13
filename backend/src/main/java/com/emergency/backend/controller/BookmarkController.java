package com.emergency.backend.controller;

import com.emergency.backend.dto.BookmarkResponseDto;
import com.emergency.backend.dto.UserResponseDto;
import com.emergency.backend.service.BookmarkService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookmarks")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class BookmarkController {
    
    @Autowired
    private BookmarkService bookmarkService;
    
    /**
     * 찜 추가 API
     * @param toiletId 화장실 ID
     * @param session HTTP 세션
     * @return 찜 추가 결과
     */
    @PostMapping("/{toiletId}")
    public ResponseEntity<Map<String, Object>> addBookmark(
            @PathVariable Long toiletId,
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
            BookmarkResponseDto bookmark = bookmarkService.addBookmark(user.getId(), toiletId);
            response.put("success", true);
            response.put("message", "찜 목록에 추가되었습니다.");
            response.put("data", bookmark);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "찜 추가에 실패했습니다.");
            return ResponseEntity.internalServerError().body(response);
        }
    }
    
    /**
     * 찜 삭제 API
     * @param toiletId 화장실 ID
     * @param session HTTP 세션
     * @return 찜 삭제 결과
     */
    @DeleteMapping("/{toiletId}")
    public ResponseEntity<Map<String, Object>> removeBookmark(
            @PathVariable Long toiletId,
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
            bookmarkService.removeBookmark(user.getId(), toiletId);
            response.put("success", true);
            response.put("message", "찜 목록에서 제거되었습니다.");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "찜 삭제에 실패했습니다.");
            return ResponseEntity.internalServerError().body(response);
        }
    }
    
    /**
     * 찜 여부 확인 API
     * @param toiletId 화장실 ID
     * @param session HTTP 세션
     * @return 찜 여부
     */
    @GetMapping("/{toiletId}/check")
    public ResponseEntity<Map<String, Object>> checkBookmark(
            @PathVariable Long toiletId,
            HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        
        // 로그인 확인
        UserResponseDto user = (UserResponseDto) session.getAttribute("user");
        if (user == null) {
            response.put("success", true);
            response.put("isBookmarked", false);
            return ResponseEntity.ok(response);
        }
        
        try {
            boolean isBookmarked = bookmarkService.isBookmarked(user.getId(), toiletId);
            response.put("success", true);
            response.put("isBookmarked", isBookmarked);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "찜 여부 확인에 실패했습니다.");
            return ResponseEntity.internalServerError().body(response);
        }
    }
    
    /**
     * 사용자의 찜 목록 조회 API
     * @param session HTTP 세션
     * @return 찜 목록
     */
    @GetMapping("/my")
    public ResponseEntity<Map<String, Object>> getMyBookmarks(HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        
        // 로그인 확인
        UserResponseDto user = (UserResponseDto) session.getAttribute("user");
        if (user == null) {
            response.put("success", false);
            response.put("message", "로그인이 필요합니다.");
            return ResponseEntity.status(401).body(response);
        }
        
        try {
            List<BookmarkResponseDto> bookmarks = bookmarkService.getUserBookmarks(user.getId());
            response.put("success", true);
            response.put("data", bookmarks);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "찜 목록 조회에 실패했습니다.");
            return ResponseEntity.internalServerError().body(response);
        }
    }
}


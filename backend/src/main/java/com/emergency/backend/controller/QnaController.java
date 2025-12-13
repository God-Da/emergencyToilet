package com.emergency.backend.controller;

import com.emergency.backend.dto.*;
import com.emergency.backend.service.QnaService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/qna")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class QnaController {
    
    @Autowired
    private QnaService qnaService;
    
    /**
     * 모든 Q&A 조회 API
     * @return Q&A 목록
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllQnas() {
        Map<String, Object> response = new HashMap<>();
        try {
            response.put("success", true);
            response.put("data", qnaService.findAll());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "Q&A 목록을 불러오는데 실패했습니다.");
            return ResponseEntity.internalServerError().body(response);
        }
    }
    
    /**
     * Q&A 상세 조회 API
     * @param id Q&A ID
     * @return Q&A 상세 정보
     */
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getQnaById(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            QnaResponseDto qna = qnaService.findById(id);
            response.put("success", true);
            response.put("data", qna);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "Q&A를 불러오는데 실패했습니다.");
            return ResponseEntity.internalServerError().body(response);
        }
    }
    
    /**
     * Q&A 작성 API
     * @param qnaRequest Q&A 작성 요청
     * @return 생성된 Q&A 정보
     */
    @PostMapping
    public ResponseEntity<Map<String, Object>> createQna(@RequestBody QnaRequestDto qnaRequest) {
        Map<String, Object> response = new HashMap<>();
        try {
            QnaResponseDto qna = qnaService.create(qnaRequest);
            response.put("success", true);
            response.put("message", "Q&A가 등록되었습니다.");
            response.put("data", qna);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "Q&A 등록에 실패했습니다.");
            return ResponseEntity.internalServerError().body(response);
        }
    }
    
    /**
     * 비밀번호 확인 API
     * @param id Q&A ID
     * @param passwordDto 비밀번호
     * @return 비밀번호 일치 여부
     */
    @PostMapping("/{id}/verify-password")
    public ResponseEntity<Map<String, Object>> verifyPassword(
            @PathVariable Long id,
            @RequestBody QnaPasswordDto passwordDto) {
        Map<String, Object> response = new HashMap<>();
        try {
            boolean isValid = qnaService.verifyPassword(id, passwordDto.getPassword());
            response.put("success", true);
            response.put("valid", isValid);
            if (!isValid) {
                response.put("message", "비밀번호가 일치하지 않습니다.");
            }
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "비밀번호 확인에 실패했습니다.");
            return ResponseEntity.internalServerError().body(response);
        }
    }
    
    /**
     * Q&A 수정 API
     * @param id Q&A ID
     * @param qnaRequest 수정 요청
     * @return 수정된 Q&A 정보
     */
    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateQna(
            @PathVariable Long id,
            @RequestBody QnaRequestDto qnaRequest) {
        Map<String, Object> response = new HashMap<>();
        try {
            QnaResponseDto qna = qnaService.update(id, qnaRequest, qnaRequest.getPassword());
            response.put("success", true);
            response.put("message", "Q&A가 수정되었습니다.");
            response.put("data", qna);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "Q&A 수정에 실패했습니다.");
            return ResponseEntity.internalServerError().body(response);
        }
    }
    
    /**
     * Q&A 삭제 API (비밀번호 필요)
     * @param id Q&A ID
     * @param passwordDto 비밀번호
     * @return 삭제 결과
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteQna(
            @PathVariable Long id,
            @RequestBody QnaPasswordDto passwordDto) {
        Map<String, Object> response = new HashMap<>();
        try {
            qnaService.delete(id, passwordDto.getPassword());
            response.put("success", true);
            response.put("message", "Q&A가 삭제되었습니다.");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "Q&A 삭제에 실패했습니다.");
            return ResponseEntity.internalServerError().body(response);
        }
    }
    
    /**
     * Q&A 삭제 API (admin만, 비밀번호 불필요)
     * @param id Q&A ID
     * @param session HTTP 세션
     * @return 삭제 결과
     */
    @DeleteMapping("/{id}/admin")
    public ResponseEntity<Map<String, Object>> deleteQnaByAdmin(
            @PathVariable Long id,
            HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        
        // admin 확인
        UserResponseDto user = (UserResponseDto) session.getAttribute("user");
        if (user == null || !"admin".equals(user.getUsername())) {
            response.put("success", false);
            response.put("message", "관리자만 Q&A를 삭제할 수 있습니다.");
            return ResponseEntity.status(403).body(response);
        }
        
        try {
            qnaService.deleteByAdmin(id);
            response.put("success", true);
            response.put("message", "Q&A가 삭제되었습니다.");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "Q&A 삭제에 실패했습니다.");
            return ResponseEntity.internalServerError().body(response);
        }
    }
    
    /**
     * 답변 작성 API (admin만)
     * @param id Q&A ID
     * @param answerDto 답변 내용
     * @param session HTTP 세션
     * @return 수정된 Q&A 정보
     */
    @PostMapping("/{id}/answer")
    public ResponseEntity<Map<String, Object>> addAnswer(
            @PathVariable Long id,
            @RequestBody QnaAnswerDto answerDto,
            HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        
        // admin 확인
        UserResponseDto user = (UserResponseDto) session.getAttribute("user");
        if (user == null || !"admin".equals(user.getUsername())) {
            response.put("success", false);
            response.put("message", "관리자만 답변을 작성할 수 있습니다.");
            return ResponseEntity.status(403).body(response);
        }
        
        try {
            QnaResponseDto qna = qnaService.addAnswer(id, answerDto.getAnswer(), user.getName() != null ? user.getName() : user.getUsername());
            response.put("success", true);
            response.put("message", "답변이 등록되었습니다.");
            response.put("data", qna);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "답변 등록에 실패했습니다.");
            return ResponseEntity.internalServerError().body(response);
        }
    }
    
    /**
     * 답변 수정 API (admin만)
     * @param id Q&A ID
     * @param answerDto 수정된 답변 내용
     * @param session HTTP 세션
     * @return 수정된 Q&A 정보
     */
    @PutMapping("/{id}/answer")
    public ResponseEntity<Map<String, Object>> updateAnswer(
            @PathVariable Long id,
            @RequestBody QnaAnswerDto answerDto,
            HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        
        // admin 확인
        UserResponseDto user = (UserResponseDto) session.getAttribute("user");
        if (user == null || !"admin".equals(user.getUsername())) {
            response.put("success", false);
            response.put("message", "관리자만 답변을 수정할 수 있습니다.");
            return ResponseEntity.status(403).body(response);
        }
        
        try {
            QnaResponseDto qna = qnaService.updateAnswer(id, answerDto.getAnswer());
            response.put("success", true);
            response.put("message", "답변이 수정되었습니다.");
            response.put("data", qna);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "답변 수정에 실패했습니다.");
            return ResponseEntity.internalServerError().body(response);
        }
    }
    
    /**
     * 답변 삭제 API (admin만)
     * @param id Q&A ID
     * @param session HTTP 세션
     * @return 삭제 결과
     */
    @DeleteMapping("/{id}/answer")
    public ResponseEntity<Map<String, Object>> deleteAnswer(
            @PathVariable Long id,
            HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        
        // admin 확인
        UserResponseDto user = (UserResponseDto) session.getAttribute("user");
        if (user == null || !"admin".equals(user.getUsername())) {
            response.put("success", false);
            response.put("message", "관리자만 답변을 삭제할 수 있습니다.");
            return ResponseEntity.status(403).body(response);
        }
        
        try {
            qnaService.deleteAnswer(id);
            response.put("success", true);
            response.put("message", "답변이 삭제되었습니다.");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "답변 삭제에 실패했습니다.");
            return ResponseEntity.internalServerError().body(response);
        }
    }
}


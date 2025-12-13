package com.emergency.backend.controller;

import com.emergency.backend.dto.LoginRequestDto;
import com.emergency.backend.dto.UserRequestDto;
import com.emergency.backend.dto.UserResponseDto;
import com.emergency.backend.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    /**
     * 회원가입 API
     * @param userRequest 회원가입 요청 정보
     * @return 회원가입 결과
     */
    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signup(@RequestBody UserRequestDto userRequest) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            UserResponseDto user = userService.signup(userRequest);
            response.put("success", true);
            response.put("message", "회원가입이 완료되었습니다.");
            response.put("user", user);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "회원가입 중 오류가 발생했습니다.");
            return ResponseEntity.internalServerError().body(response);
        }
    }
    
    /**
     * 로그인 API
     * @param loginRequest 로그인 요청 정보
     * @param session HTTP 세션
     * @return 로그인 결과
     */
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequestDto loginRequest, HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            UserResponseDto user = userService.validateLogin(loginRequest.getUsername(), loginRequest.getPassword());
            
            // Spring Security Authentication 생성
            Authentication authentication = new UsernamePasswordAuthenticationToken(
                user.getUsername(),
                null,
                Arrays.asList(new SimpleGrantedAuthority("ROLE_USER"))
            );
            
            // SecurityContext에 Authentication 설정
            SecurityContext securityContext = SecurityContextHolder.getContext();
            securityContext.setAuthentication(authentication);
            
            // 세션에 SecurityContext 저장 (Spring Security가 인식하도록)
            session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, securityContext);
            
            // 세션에 사용자 정보 저장 (컨트롤러에서 사용하기 위해)
            session.setAttribute("user", user);
            session.setAttribute("userId", user.getId());
            session.setAttribute("username", user.getUsername());
            
            response.put("success", true);
            response.put("message", "로그인되었습니다.");
            response.put("user", user);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "로그인 중 오류가 발생했습니다.");
            return ResponseEntity.internalServerError().body(response);
        }
    }
    
    /**
     * 로그아웃 API
     * @param session HTTP 세션
     * @return 로그아웃 결과
     */
    @PostMapping("/logout")
    public ResponseEntity<Map<String, Object>> logout(HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        
        // SecurityContext 초기화
        SecurityContextHolder.clearContext();
        
        // 세션 무효화
        session.invalidate();
        
        response.put("success", true);
        response.put("message", "로그아웃되었습니다.");
        return ResponseEntity.ok(response);
    }
    
    /**
     * 현재 로그인한 사용자 정보 조회 API
     * @param session HTTP 세션
     * @return 사용자 정보
     */
    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getCurrentUser(HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        
        UserResponseDto user = (UserResponseDto) session.getAttribute("user");
        
        if (user == null) {
            response.put("success", false);
            response.put("message", "로그인되지 않았습니다.");
            return ResponseEntity.status(401).body(response);
        }
        
        response.put("success", true);
        response.put("user", user);
        return ResponseEntity.ok(response);
    }
}


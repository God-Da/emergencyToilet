package com.emergency.backend.service;

import com.emergency.backend.domain.User;
import com.emergency.backend.dto.UserRequestDto;
import com.emergency.backend.dto.UserResponseDto;
import com.emergency.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    /**
     * 회원가입
     * @param userRequest 회원가입 요청 정보
     * @return 생성된 사용자 정보
     */
    @Transactional
    public UserResponseDto signup(UserRequestDto userRequest) {
        // 사용자명 또는 이메일 중복 확인
        if (userRepository.existsByUsernameOrEmail(userRequest.getUsername(), userRequest.getEmail())) {
            throw new RuntimeException("이미 사용 중인 사용자명 또는 이메일입니다.");
        }
        
        // 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(userRequest.getPassword());
        
        // 사용자 생성
        User user = new User();
        user.setUsername(userRequest.getUsername());
        user.setPassword(encodedPassword);
        user.setEmail(userRequest.getEmail());
        user.setName(userRequest.getName());
        user.setCreatedDate(LocalDateTime.now());
        
        User savedUser = userRepository.save(user);
        
        // 응답 DTO 생성
        UserResponseDto response = new UserResponseDto();
        response.setId(savedUser.getId());
        response.setUsername(savedUser.getUsername());
        response.setEmail(savedUser.getEmail());
        response.setName(savedUser.getName());
        
        return response;
    }
    
    /**
     * 로그인 검증
     * @param username 사용자명
     * @param password 비밀번호
     * @return 사용자 정보
     */
    public UserResponseDto validateLogin(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("사용자명 또는 비밀번호가 올바르지 않습니다."));
        
        // 비밀번호 확인
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("사용자명 또는 비밀번호가 올바르지 않습니다.");
        }
        
        // 응답 DTO 생성
        UserResponseDto response = new UserResponseDto();
        response.setId(user.getId());
        response.setUsername(user.getUsername());
        response.setEmail(user.getEmail());
        response.setName(user.getName());
        
        return response;
    }
}


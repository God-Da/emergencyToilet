package com.emergency.backend.service;

import com.emergency.backend.domain.Qna;
import com.emergency.backend.dto.*;
import com.emergency.backend.repository.QnaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class QnaService {
    
    @Autowired
    private QnaRepository qnaRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
    
    /**
     * 모든 Q&A 조회 (최신순)
     * @return Q&A 목록
     */
    public List<QnaResponseDto> findAll() {
        List<Qna> qnas = qnaRepository.findAllOrderByCreatedDateDesc();
        
        return qnas.stream().map(qna -> {
            QnaResponseDto dto = new QnaResponseDto();
            dto.setId(qna.getId());
            dto.setTitle(qna.getTitle());
            dto.setContent(qna.getContent());
            dto.setAuthor(qna.getAuthor());
            dto.setCreatedDate(qna.getCreatedDate().format(DATE_FORMATTER));
            dto.setViewCount(qna.getViewCount());
            dto.setIsAnswered(qna.getIsAnswered());
            dto.setAnswer(qna.getAnswer());
            dto.setAnswerDate(qna.getAnswerDate() != null ? qna.getAnswerDate().format(DATE_FORMATTER) : null);
            dto.setAnswerAuthor(qna.getAnswerAuthor());
            return dto;
        }).collect(Collectors.toList());
    }
    
    /**
     * Q&A 상세 조회
     * @param id Q&A ID
     * @return Q&A 상세 정보
     */
    @Transactional
    public QnaResponseDto findById(Long id) {
        Qna qna = qnaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Q&A를 찾을 수 없습니다."));
        
        // 조회수 증가
        qna.setViewCount(qna.getViewCount() + 1);
        qnaRepository.save(qna);
        
        QnaResponseDto dto = new QnaResponseDto();
        dto.setId(qna.getId());
        dto.setTitle(qna.getTitle());
        dto.setContent(qna.getContent());
        dto.setAuthor(qna.getAuthor());
        dto.setCreatedDate(qna.getCreatedDate().format(DATE_FORMATTER));
        dto.setViewCount(qna.getViewCount());
        dto.setIsAnswered(qna.getIsAnswered());
        dto.setAnswer(qna.getAnswer());
        dto.setAnswerDate(qna.getAnswerDate() != null ? qna.getAnswerDate().format(DATE_FORMATTER) : null);
        dto.setAnswerAuthor(qna.getAnswerAuthor());
        return dto;
    }
    
    /**
     * Q&A 작성
     * @param qnaRequest Q&A 작성 요청
     * @return 생성된 Q&A 정보
     */
    @Transactional
    public QnaResponseDto create(QnaRequestDto qnaRequest) {
        // 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(qnaRequest.getPassword());
        
        Qna qna = new Qna();
        qna.setTitle(qnaRequest.getTitle());
        qna.setContent(qnaRequest.getContent());
        qna.setAuthor(qnaRequest.getAuthor());
        qna.setPassword(encodedPassword);
        qna.setCreatedDate(LocalDateTime.now());
        qna.setViewCount(0);
        qna.setIsAnswered(false);
        
        Qna savedQna = qnaRepository.save(qna);
        
        return convertToDto(savedQna);
    }
    
    /**
     * 비밀번호 확인
     * @param id Q&A ID
     * @param password 비밀번호
     * @return 비밀번호 일치 여부
     */
    public boolean verifyPassword(Long id, String password) {
        Qna qna = qnaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Q&A를 찾을 수 없습니다."));
        
        return passwordEncoder.matches(password, qna.getPassword());
    }
    
    /**
     * Q&A 수정
     * @param id Q&A ID
     * @param qnaRequest 수정 요청
     * @param password 비밀번호
     * @return 수정된 Q&A 정보
     */
    @Transactional
    public QnaResponseDto update(Long id, QnaRequestDto qnaRequest, String password) {
        Qna qna = qnaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Q&A를 찾을 수 없습니다."));
        
        // 비밀번호 확인
        if (!passwordEncoder.matches(password, qna.getPassword())) {
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }
        
        qna.setTitle(qnaRequest.getTitle());
        qna.setContent(qnaRequest.getContent());
        qna.setAuthor(qnaRequest.getAuthor());
        
        Qna savedQna = qnaRepository.save(qna);
        
        return convertToDto(savedQna);
    }
    
    /**
     * Q&A 삭제
     * @param id Q&A ID
     * @param password 비밀번호
     */
    @Transactional
    public void delete(Long id, String password) {
        Qna qna = qnaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Q&A를 찾을 수 없습니다."));
        
        // 비밀번호 확인
        if (!passwordEncoder.matches(password, qna.getPassword())) {
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }
        
        qnaRepository.delete(qna);
    }
    
    /**
     * Q&A 삭제 (admin용, 비밀번호 불필요)
     * @param id Q&A ID
     */
    @Transactional
    public void deleteByAdmin(Long id) {
        Qna qna = qnaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Q&A를 찾을 수 없습니다."));
        
        qnaRepository.delete(qna);
    }
    
    /**
     * 답변 작성 (admin만)
     * @param id Q&A ID
     * @param answer 답변 내용
     * @param answerAuthor 답변 작성자 (admin)
     * @return 수정된 Q&A 정보
     */
    @Transactional
    public QnaResponseDto addAnswer(Long id, String answer, String answerAuthor) {
        Qna qna = qnaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Q&A를 찾을 수 없습니다."));
        
        qna.setAnswer(answer);
        qna.setIsAnswered(true);
        qna.setAnswerDate(LocalDateTime.now());
        qna.setAnswerAuthor(answerAuthor);
        
        Qna savedQna = qnaRepository.save(qna);
        
        return convertToDto(savedQna);
    }
    
    /**
     * 답변 수정 (admin만)
     * @param id Q&A ID
     * @param answer 수정된 답변 내용
     * @return 수정된 Q&A 정보
     */
    @Transactional
    public QnaResponseDto updateAnswer(Long id, String answer) {
        Qna qna = qnaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Q&A를 찾을 수 없습니다."));
        
        qna.setAnswer(answer);
        qna.setAnswerDate(LocalDateTime.now());
        
        Qna savedQna = qnaRepository.save(qna);
        
        return convertToDto(savedQna);
    }
    
    /**
     * 답변 삭제 (admin만)
     * @param id Q&A ID
     */
    @Transactional
    public void deleteAnswer(Long id) {
        Qna qna = qnaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Q&A를 찾을 수 없습니다."));
        
        qna.setAnswer(null);
        qna.setIsAnswered(false);
        qna.setAnswerDate(null);
        qna.setAnswerAuthor(null);
        
        qnaRepository.save(qna);
    }
    
    /**
     * Qna 엔티티를 DTO로 변환
     */
    private QnaResponseDto convertToDto(Qna qna) {
        QnaResponseDto dto = new QnaResponseDto();
        dto.setId(qna.getId());
        dto.setTitle(qna.getTitle());
        dto.setContent(qna.getContent());
        dto.setAuthor(qna.getAuthor());
        dto.setCreatedDate(qna.getCreatedDate().format(DATE_FORMATTER));
        dto.setViewCount(qna.getViewCount());
        dto.setIsAnswered(qna.getIsAnswered());
        dto.setAnswer(qna.getAnswer());
        dto.setAnswerDate(qna.getAnswerDate() != null ? qna.getAnswerDate().format(DATE_FORMATTER) : null);
        dto.setAnswerAuthor(qna.getAnswerAuthor());
        return dto;
    }
}


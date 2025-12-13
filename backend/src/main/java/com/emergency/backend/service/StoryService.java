package com.emergency.backend.service;

import com.emergency.backend.domain.Story;
import com.emergency.backend.dto.StoryResponseDto;
import com.emergency.backend.repository.StoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StoryService {
    
    @Autowired
    private StoryRepository storyRepository;
    
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    
    /**
     * 모든 재미있는 화장실 이야기 조회 (최신순)
     * @return 이야기 목록
     */
    public List<StoryResponseDto> findAll() {
        List<Story> stories = storyRepository.findAllOrderByCreatedDateDesc();
        
        return stories.stream().map(story -> {
            StoryResponseDto dto = new StoryResponseDto();
            dto.setId(story.getId());
            dto.setTitle(story.getTitle());
            dto.setContent(story.getContent());
            dto.setAuthor(story.getAuthor());
            dto.setCreatedDate(story.getCreatedDate().format(DATE_FORMATTER));
            dto.setViewCount(story.getViewCount());
            return dto;
        }).collect(Collectors.toList());
    }
    
    /**
     * 재미있는 화장실 이야기 상세 조회
     * @param id 이야기 ID
     * @return 이야기 상세 정보
     */
    @Transactional
    public StoryResponseDto findById(Long id) {
        Story story = storyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("이야기를 찾을 수 없습니다."));
        
        // 조회수 증가
        story.setViewCount(story.getViewCount() + 1);
        storyRepository.save(story);
        
        StoryResponseDto dto = new StoryResponseDto();
        dto.setId(story.getId());
        dto.setTitle(story.getTitle());
        dto.setContent(story.getContent());
        dto.setAuthor(story.getAuthor());
        dto.setCreatedDate(story.getCreatedDate().format(DATE_FORMATTER));
        dto.setViewCount(story.getViewCount());
        return dto;
    }
}


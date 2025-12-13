package com.emergency.backend.controller;

import com.emergency.backend.dto.StoryResponseDto;
import com.emergency.backend.service.StoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stories")
@CrossOrigin(origins = "http://localhost:3000")
public class StoryController {
    
    @Autowired
    private StoryService storyService;
    
    /**
     * 모든 재미있는 화장실 이야기 조회 API
     * @return 이야기 목록
     */
    @GetMapping
    public ResponseEntity<List<StoryResponseDto>> getAllStories() {
        try {
            List<StoryResponseDto> stories = storyService.findAll();
            return ResponseEntity.ok(stories);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
    
    /**
     * 재미있는 화장실 이야기 상세 조회 API
     * @param id 이야기 ID
     * @return 이야기 상세 정보
     */
    @GetMapping("/{id}")
    public ResponseEntity<StoryResponseDto> getStoryById(@PathVariable Long id) {
        try {
            StoryResponseDto story = storyService.findById(id);
            return ResponseEntity.ok(story);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}


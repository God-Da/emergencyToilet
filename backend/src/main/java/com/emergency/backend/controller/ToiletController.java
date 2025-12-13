package com.emergency.backend.controller;

import com.emergency.backend.dto.ToiletResponseDto;
import com.emergency.backend.service.ToiletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/toilets")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ToiletController {
    
    @Autowired
    private ToiletService toiletService;
    
    /**
     * 주변 화장실 검색 API
     * @param latitude 현재 위도
     * @param longitude 현재 경도
     * @param radius 반경 (km, 선택사항, 기본값 5km)
     * @return 주변 화장실 목록
     */
    @GetMapping("/nearby")
    public ResponseEntity<List<ToiletResponseDto>> getNearbyToilets(
            @RequestParam Double latitude,
            @RequestParam Double longitude,
            @RequestParam(required = false) Double radius) {
        
        try {
            List<ToiletResponseDto> toilets = toiletService.findNearbyToilets(latitude, longitude, radius);
            return ResponseEntity.ok(toilets);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
    
    /**
     * 주소 기반 화장실 검색 API
     * @param address 검색할 주소 (도로명 주소 또는 지번 주소)
     * @return 주소가 포함된 화장실 목록
     */
    @GetMapping("/search")
    public ResponseEntity<List<ToiletResponseDto>> searchToiletsByAddress(
            @RequestParam String address) {
        
        try {
            List<ToiletResponseDto> toilets = toiletService.findByAddress(address);
            return ResponseEntity.ok(toilets);
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("주소 검색 에러: " + e.getMessage());
            return ResponseEntity.ok(java.util.Collections.emptyList());
        }
    }
    
    /**
     * 모든 화장실 조회 (테스트용)
     * @return 모든 화장실 목록
     */
    @GetMapping("/all")
    public ResponseEntity<List<ToiletResponseDto>> getAllToilets() {
        try {
            List<ToiletResponseDto> toilets = toiletService.findAll();
            return ResponseEntity.ok(toilets);
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("전체 조회 에러: " + e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
}


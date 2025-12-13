package com.emergency.backend.service;

import com.emergency.backend.domain.Bookmark;
import com.emergency.backend.domain.Toilet;
import com.emergency.backend.dto.BookmarkResponseDto;
import com.emergency.backend.repository.BookmarkRepository;
import com.emergency.backend.repository.ToiletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookmarkService {
    
    @Autowired
    private BookmarkRepository bookmarkRepository;
    
    @Autowired
    private ToiletRepository toiletRepository;
    
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
    
    /**
     * 찜 추가
     * @param userId 사용자 ID
     * @param toiletId 화장실 ID
     * @return 찜 정보
     */
    @Transactional
    public BookmarkResponseDto addBookmark(Long userId, Long toiletId) {
        // 이미 찜한 경우 확인
        if (bookmarkRepository.findByUserIdAndToiletId(userId, toiletId).isPresent()) {
            throw new RuntimeException("이미 찜한 화장실입니다.");
        }
        
        Bookmark bookmark = new Bookmark();
        bookmark.setUserId(userId);
        bookmark.setToiletId(toiletId);
        bookmark.setCreatedDate(LocalDateTime.now());
        
        Bookmark savedBookmark = bookmarkRepository.save(bookmark);
        
        return convertToDto(savedBookmark);
    }
    
    /**
     * 찜 삭제
     * @param userId 사용자 ID
     * @param toiletId 화장실 ID
     */
    @Transactional
    public void removeBookmark(Long userId, Long toiletId) {
        Bookmark bookmark = bookmarkRepository.findByUserIdAndToiletId(userId, toiletId)
                .orElseThrow(() -> new RuntimeException("찜한 화장실이 아닙니다."));
        
        bookmarkRepository.delete(bookmark);
    }
    
    /**
     * 사용자의 찜 목록 조회
     * @param userId 사용자 ID
     * @return 찜 목록
     */
    public List<BookmarkResponseDto> getUserBookmarks(Long userId) {
        List<Bookmark> bookmarks = bookmarkRepository.findByUserId(userId);
        
        return bookmarks.stream().map(bookmark -> {
            Toilet toilet = toiletRepository.findById(bookmark.getToiletId())
                    .orElse(null);
            
            if (toilet == null) {
                return null;
            }
            
            BookmarkResponseDto dto = new BookmarkResponseDto();
            dto.setId(bookmark.getId());
            dto.setToiletId(toilet.getId());
            dto.setToiletName(toilet.getName());
            dto.setRoadAddress(toilet.getRoadAddress());
            dto.setLotAddress(toilet.getLotAddress());
            dto.setCreatedDate(bookmark.getCreatedDate().format(DATE_FORMATTER));
            return dto;
        }).filter(dto -> dto != null).collect(Collectors.toList());
    }
    
    /**
     * 찜 여부 확인
     * @param userId 사용자 ID
     * @param toiletId 화장실 ID
     * @return 찜 여부
     */
    public boolean isBookmarked(Long userId, Long toiletId) {
        if (userId == null || userId < 0) {
            return false;
        }
        return bookmarkRepository.findByUserIdAndToiletId(userId, toiletId).isPresent();
    }
    
    /**
     * 화장실의 찜 개수 조회
     * @param toiletId 화장실 ID
     * @return 찜 개수
     */
    public Long getBookmarkCount(Long toiletId) {
        return bookmarkRepository.countBookmarksByToiletId(toiletId);
    }
    
    /**
     * Bookmark를 DTO로 변환
     */
    private BookmarkResponseDto convertToDto(Bookmark bookmark) {
        Toilet toilet = toiletRepository.findById(bookmark.getToiletId())
                .orElse(null);
        
        if (toilet == null) {
            return null;
        }
        
        BookmarkResponseDto dto = new BookmarkResponseDto();
        dto.setId(bookmark.getId());
        dto.setToiletId(toilet.getId());
        dto.setToiletName(toilet.getName());
        dto.setRoadAddress(toilet.getRoadAddress());
        dto.setLotAddress(toilet.getLotAddress());
        dto.setCreatedDate(bookmark.getCreatedDate().format(DATE_FORMATTER));
        return dto;
    }
}


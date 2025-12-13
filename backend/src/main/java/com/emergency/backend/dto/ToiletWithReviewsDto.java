package com.emergency.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ToiletWithReviewsDto {
    private Long id;
    private String name;
    private String roadAddress;
    private String lotAddress;
    private Double latitude;
    private Double longitude;
    private String openTime;
    private Double averageRating;
    private Long reviewCount;
    private Long bookmarkCount;
    private Boolean isBookmarked;
    private List<ReviewResponseDto> recentReviews; // 최근 리뷰 1-2개
}


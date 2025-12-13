package com.emergency.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewWithToiletDto {
    private Long id;
    private Long userId;
    private String username;
    private Long toiletId;
    private String toiletName;
    private String toiletRoadAddress;
    private String toiletLotAddress;
    private String content;
    private Integer rating;
    private String createdDate;
}


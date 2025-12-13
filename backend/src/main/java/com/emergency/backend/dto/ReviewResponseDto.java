package com.emergency.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewResponseDto {
    private Long id;
    private Long userId;
    private String username;
    private String userEmail;
    private Long toiletId;
    private String content;
    private Integer rating;
    private String createdDate;
}


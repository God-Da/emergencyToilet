package com.emergency.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QnaResponseDto {
    private Long id;
    private String title;
    private String content;
    private String author;
    private String createdDate;
    private Integer viewCount;
    private Boolean isAnswered;
    private String answer;
    private String answerDate;
    private String answerAuthor;
}


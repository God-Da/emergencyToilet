package com.emergency.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ToiletResponseDto {
    private Long id;
    private String name;
    private String roadAddress;
    private String lotAddress;
    private Double latitude;
    private Double longitude;
    private String openTime;
    private Double distance; // km 단위
}


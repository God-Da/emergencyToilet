package com.emergency.backend.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "toilet")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Toilet {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "name", nullable = false)
    private String name;
    
    @Column(name = "road_address")
    private String roadAddress;
    
    @Column(name = "lot_address")
    private String lotAddress;
    
    @Column(name = "latitude", nullable = false)
    private Double latitude;
    
    @Column(name = "longitude", nullable = false)
    private Double longitude;
    
    @Column(name = "open_time")
    private String openTime;
}


package com.ssafy.IBG.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter @Setter
public class Deal {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dealNo")
    private int daelNo;

    private int userNo;
    private int gameNo;

    private String dealTitle;
    private String dealContent;
    private String dealFileName;
    private String dealSavedName;
    private String dealPath;
    private int dealPrice;

    @Column(columnDefinition = "TIMESTAMP default CURRENT_TIMESTAMP")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dealReg;

    @Column(nullable = false)
    private boolean dealStatus = false;

}

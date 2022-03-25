package com.ssafy.IBG.domain;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Chat {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chatNo")
    private int chatNo;

    private int userNo;

    private int dealNo;
}

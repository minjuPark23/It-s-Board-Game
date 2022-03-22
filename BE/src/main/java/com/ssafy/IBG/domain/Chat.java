package com.ssafy.IBG.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
public class Chat {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chatNo")
    private int chatNo;

    private int userNo;

    private int dealNo;
}

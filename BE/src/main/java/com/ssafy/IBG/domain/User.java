package com.ssafy.IBG.domain;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Data
public class User {

    @Id @GeneratedValue
    @Column(name = "userNo")
    private int userNo;

    private String userEmail;
    private String userPwd;
    private String userNick;
}

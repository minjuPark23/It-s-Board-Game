package com.ssafy.IBG.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter @Setter
public class Log {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "logNo")
    private int logNo;

    private int chatNo;

    private int userNo;

    private int logContent;

    @Column(columnDefinition = "TIMESTAMP default CURRENT_TIMESTAMP")
    @Temporal(TemporalType.TIMESTAMP)
    private Date logReg;
}

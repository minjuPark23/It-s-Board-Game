package com.ssafy.IBG.domain;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
public class Log {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int logNo;

    private int chatNo;

    private int userNo;

    private int logContent;

    @Column(columnDefinition = "TIMESTAMP default CURRENT_TIMESTAMP")
    @Temporal(TemporalType.TIMESTAMP)
    private Date logReg;
}

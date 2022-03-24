package com.ssafy.IBG.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Result<T> {
    private boolean isSuccess;
    private int code;
    private T data;

    public Result(boolean isSuccess, int code) {
        this.isSuccess = isSuccess;
    }

    public Result(int code, T data){
        this.code = code;
        this.data = data;
    }

    public Result(int code){
        this.code = code;
    }
}

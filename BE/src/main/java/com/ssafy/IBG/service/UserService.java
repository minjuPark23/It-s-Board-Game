package com.ssafy.IBG.service;

import com.ssafy.IBG.domain.User;
import com.ssafy.IBG.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    /**
     * @author : 곽현준
     * @date : 2022-03-23 오후 5:49
     * @description : userNo로 user객체 검색
    **/
    public User getUserByUserNo(int userNo) {
        return userRepository.findUserByUserNo(userNo);
    }
}

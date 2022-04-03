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
     * @author : 권오범
     * @date : 2022-03-23
     * @desc: 유저 회원 가입 후 회원 번호를 반환
     **/
    public boolean join(User user){
        return userRepository.saveUser(user);
    }

    /**
     * @author : 권오범
     * @date : 2022-03-23
     * @desc: 유저 회원가입 시 이메일 중복 확인 후 T/F 반환
     **/
    public boolean confirmEmail(String userEmail){
        return userRepository.emailVerify(userEmail) == 0L;
    }

    /**
     * @author : 권오범
     * @date : 2022-03-23
     * @desc: 유저 회원가입 시 닉네임 중복 확인 후 T/F 반환
     **/
    public boolean confirmNick(String userNick){
        return userRepository.nickVerify(userNick) == 0L;
    }

    /**
     * @author : 권오범
     * @date : 2022-03-23
     * @desc: 유저 회원 번호로 해당 유저 정보를 반환
     **/
    public User getUser(Integer userNo){
        return userRepository.findUserByUserNo(userNo);
    }


}

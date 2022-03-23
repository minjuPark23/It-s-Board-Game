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

    public User getUserByUserNo(int userNo) {
        return userRepository.findUser(userNo);
    }
}

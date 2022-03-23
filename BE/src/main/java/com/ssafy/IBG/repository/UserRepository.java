package com.ssafy.IBG.repository;

import com.ssafy.IBG.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;

@Repository
@RequiredArgsConstructor
public class UserRepository {

    private final EntityManager em;

    /**
     * @author : 곽현준
     * @date : 2022-03-23 오후 5:48
     * @description : userNo로 유저 객체 검색
    **/
    public User findUserByUserNo(int userNo) {
        try{
            return em.find(User.class, userNo);
        }catch (NoResultException e) {
            return null;
        }
    }
}

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

    public User findUser(int userNo) {
        try{
            return em.find(User.class, userNo);
        }catch (NoResultException e) {
            return null;
        }
    }
}

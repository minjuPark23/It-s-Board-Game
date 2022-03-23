package com.ssafy.IBG.repository;

import com.ssafy.IBG.domain.Game;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;

@Repository
@RequiredArgsConstructor
public class GameRepository {

    private final EntityManager em;

    /**
     * @author : 곽현준
     * @date : 2022-03-23 오후 5:48
     * @description : gameNo로 Game 객체 검색
    **/
    public Game findGameByGameNo(int gameNo) {
        try{
            return em.find(Game.class, gameNo);
        }catch (NoResultException e) {
            return null;
        }
    }
}

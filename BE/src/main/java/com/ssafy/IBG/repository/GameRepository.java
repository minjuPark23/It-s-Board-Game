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

    public Game findGame(int gameNo) {
        try{
            return em.find(Game.class, gameNo);
        }catch (NoResultException e) {
            return null;
        }
    }
}

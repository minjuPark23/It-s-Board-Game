package com.ssafy.IBG.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQuery;
import com.ssafy.IBG.domain.Game;
import com.ssafy.IBG.domain.QGame;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class GameRepository {

    private final EntityManager em;

    public List<Game> findSearchGame(String searchName){
//        return em.createQuery("select g from Game g where g.gameName like :searchName", Game.class)
//                .setParameter("searchName", "%"+searchName+"%")
//                .getResultList();
        JPQLQuery<Game> query = new JPAQuery<>(em);
        QGame qGame = new QGame("Game");
        List<Game> gameList = query.from(qGame)
                .where(qGame.gameName.like("%"+searchName+"%"))
                .fetch();
        return gameList;
    }

    public Game findByGameName(String gameName){
        try{
            Game game = em.createQuery("select g from Game g where g.gameName = :gameName", Game.class)
                    .setParameter("gameName", gameName)
                    .getSingleResult();
            return game;
        }catch (NoResultException e){
            return null;
        }
    }

    public Game findByGameNo(int gameNo){
        try{
            Game game = em.createQuery("select g from Game g where g.gameNo = :gameNo", Game.class)
                    .setParameter("gameNo", gameNo)
                    .getSingleResult();
            return game;
        }catch (NoResultException e){
            return null;
        }

    }

    public List<Game> findByFilter(String gameName, Integer gamePlayer, Integer gameTime, Double gameWeight, Integer gameAge, Double gameScore, List<String> gameCategory) {

        JPQLQuery<Game> query = new JPAQuery<>(em);
        QGame qGame = new QGame("Game");

        BooleanBuilder builder = new BooleanBuilder();
        if(gameName != null){
            builder.and(qGame.gameName.contains(gameName));
        }
        if(gamePlayer != null){
            builder.and(qGame.gameMinPlayer.goe(gamePlayer));
        }
        if(gameTime != null){
            builder.and(qGame.gameMaxTime.loe(gameTime));
        }
        if(gameAge != null){
            builder.and(qGame.gameAge.loe(gameAge));
        }
        if(gameWeight != null){
            builder.and(qGame.gameWeight.loe(gameWeight));
        }
        if(gameScore != null){
            builder.and(qGame.gameTotalScore.goe(gameScore));
        }
        if(!gameCategory.isEmpty()){
            for (String c : gameCategory) {
                builder.and(qGame.gameCategory.contains(c));
            }
        }

        List<Game> gameList = query.from(qGame)
                .where(builder)
                .fetch();
        return gameList;
    }

}

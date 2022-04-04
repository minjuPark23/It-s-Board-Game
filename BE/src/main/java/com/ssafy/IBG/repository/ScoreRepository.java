package com.ssafy.IBG.repository;

import com.ssafy.IBG.domain.Game;
import com.ssafy.IBG.domain.Score;
import com.ssafy.IBG.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ScoreRepository {

    private final EntityManager em;

    /**
     *  Score 등록
     * */
    public boolean saveScore(Score score){
        try{
            em.persist(score);
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }

    /**
     *  이전 평가 기록 찾기
     * */
    public Score findScoreByUserNoGameNo(Integer userNo, Integer gameNo){
        try {
            return em.createQuery("select s from Score s where s.user.userNo =: userNo and s.game.gameNo =: gameNo", Score.class)
                    .setParameter("userNo", userNo)
                    .setParameter("gameNo", gameNo)
                    .getSingleResult();
        } catch (NoResultException e){
            System.err.println("이전 평가 기록이 없습니다.");
            return null;
        }
    }

    /**
    * @author : 박민주
    * @date : 2022-04-01 오후 3:59
    **/
    public int findScoreCntByUserNo(Integer userNo){
        return em.createQuery("select s from Score s where s.user.userNo = :userNo", Score.class)
                .setParameter("userNo", userNo)
                .getResultList().size();
    }

    public List<Score> findScoreListByUserNoOrderByRating(Integer userNo){
        return em.createQuery("select s from Score s where s.user.userNo =: userNo order by s.scoreRating desc", Score.class)
                .setParameter("userNo", userNo)
                .getResultList();
    }

}

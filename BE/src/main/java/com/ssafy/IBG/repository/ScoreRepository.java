package com.ssafy.IBG.repository;

import com.ssafy.IBG.domain.Score;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;

@Repository
@RequiredArgsConstructor
public class ScoreRepository {

    private final EntityManager em;

    /**
     *  Score 등록
     * */
    @Transactional
    public boolean save(Score score){
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
            return em.createQuery("select s from Score s where s.userNo =: userNo and s.gameNo =: gameNo", Score.class)
                    .setParameter("userNo", userNo)
                    .setParameter("gameNo", gameNo)
                    .getSingleResult();
        } catch (NoResultException e){
            System.err.println("이전 평가 기록이 없습니다.");
            return null;
        }
    }

}

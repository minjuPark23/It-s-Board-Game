package com.ssafy.IBG.repository;

import com.ssafy.IBG.domain.Interest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class InterestRepository {

    private final EntityManager em;

    /**
     *  관심 목록 삭제
     * */
    @Transactional
    public void remove(Interest interest){
        em.remove(interest);
    }

    /**
     *  관심 목록 저장
     * */
    @Transactional
    public void save(Interest interest){
        em.persist(interest);
    }

    /**
     *  관심 칼럼 가져오기
     * */
    public Interest findInterestByUserNoGameNo(Integer userNo, Integer gameNo){
        try {
            return em.createQuery("select i from Interest i where i.userNo =: userNo and i.gameNo =: gameNo", Interest.class)
                    .setParameter("userNo", userNo)
                    .setParameter("gameNo", gameNo)
                    .getSingleResult();
        } catch(NoResultException e){
            System.err.println("관심 목록을 업데이트합니다.");
            return null;
        }
    }

    /**
     *  관심 목록 가져오기
     * */
    public List<Interest> findInterestListByUserNo(Integer userNo){
        return em.createQuery("select i from Interest i where i.userNo =: userNo", Interest.class)
                .setParameter("userNo", userNo)
                .getResultList();
    }


}

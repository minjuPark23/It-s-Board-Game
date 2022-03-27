package com.ssafy.IBG.repository;

import com.ssafy.IBG.domain.Deal;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class DealRepository {

    private final EntityManager em;

    /**
     * @author : 곽현준
     * @date : 2022-03-23 오후 5:48
     * @desc : deal 객체 저장
    **/
    public void saveDeal(Deal deal) {
        em.persist(deal);
    }

    /**
     * @author : 곽현준
     * @date : 2022-03-27 오후 5:34
     * @desc : 전체 deal List 가져오기
    **/
    public List<Deal> findDeal() {
        try{
            return em.createQuery("select d from Deal d", Deal.class)
                    .getResultList();
        }catch (NoResultException e) {
            return null;
        }
    }

    /**
     * @author : 곽현준
     * @date : 2022-03-27 오후 5:51
     * @desc : 게임 이름으로 deal List 가져오기
    **/
    public List<Deal> findDealByGameName(String gameName) {
        try {
            return em.createQuery("select d from Deal d where d.game.gameName = :gameName", Deal.class)
                    .setParameter("gameName", gameName)
                    .getResultList();
        }catch (NoResultException e) {
            return null;
        }
    }

    /**
     * @author : 곽현준
     * @date : 2022-03-27 오후 5:57
     * @desc : 거래 상세 가져오기
    **/
    public Deal findDealByDealNo(int dealNo) {
        try{
            return em.find(Deal.class, dealNo);
        }catch (NoResultException e) {
            return null;
        }
    }
}

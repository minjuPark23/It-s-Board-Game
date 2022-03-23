package com.ssafy.IBG.repository;

import com.ssafy.IBG.domain.Deal;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
public class DealRepository {

    private final EntityManager em;

    /**
     * @author : 곽현준
     * @date : 2022-03-23 오후 5:48
     * @description : deal 객체 저장
    **/
    public void saveDeal(Deal deal) {
        em.persist(deal);
    }

}

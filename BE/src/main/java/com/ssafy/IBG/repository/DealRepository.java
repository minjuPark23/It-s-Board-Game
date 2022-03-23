package com.ssafy.IBG.repository;

import com.ssafy.IBG.domain.Deal;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
public class DealRepository {

    private final EntityManager em;

    public void saveDeal(Deal deal) {
        em.persist(deal);
    }

}

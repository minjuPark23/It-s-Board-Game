package com.ssafy.IBG.repository;

import com.ssafy.IBG.domain.Review;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ReviewRepository {

    private final EntityManager em;

    public List<Review> findByGameNo(int gameNo){
        List<Review> reviewList = em.createQuery("select r from Review r where r.game.gameNo = :gameNo", Review.class)
                .setParameter("gameNo", gameNo)
                .getResultList();
        return reviewList;
    }

    public void save(Review review){
        em.persist(review);
    }
}

package com.ssafy.IBG.repository;

import com.ssafy.IBG.domain.Game;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class RecommendRepository {

    private final EntityManager em;

    /**
     * @author : 권오범
     * @date : 2022-03-25 오전 11:00
     *  limit : 30 + (랜덤하게 뽑을 게임)
     **/
    public List<Game> findGameForSurvey(int limit){
        // 기본 지정 데이터 30개
        List<Game> selectedList = em.createQuery("select g from Game g where g.gameNo < 31", Game.class)
                .getResultList();

        // 전체 데이터 수
        Long size = (Long)em.createQuery("SELECT COUNT(g) FROM Game g").getSingleResult();

        // 중복없는 난수 20개 선정
        HashSet<Integer> set = new HashSet<>();
        List<Integer> index = new ArrayList<>();
        while(set.size() < (limit-30)){
            int num = 31 + (int)(Math.random()*(size - 30));
            if(set.contains(num))
                continue;

            set.add(num);
            index.add(num);
        }

        // 랜덤하게 뽑은 게임 번호로 게임 검색
        List<Game> randomList = em.createQuery("SELECT g FROM Game g WHERE g.gameNo IN :indexs", Game.class)
                .setParameter("indexs", index)
                .getResultList();

        // 선별된 게임 + 임의의 게임
        List<Game> mergedList = new LinkedList<>();
        mergedList.addAll(selectedList);
        mergedList.addAll(randomList);

        return mergedList;
    }

    /**
     * @author : 권오범
     * @date : 2022-03-25 오전 15:00
     *      - Test 필요
     **/
    public List<Game> findRecommendByReviews(int limit) {
        return em.createQuery("select g from Game g order by count(g.review) desc", Game.class)
                .setMaxResults(limit)
                .getResultList();
    }


    /**
     * @author : 권오범
     * @date : 2022-03-25 오전 15:00
     *      - Test 필요
     **/
    public List<Game> findRecommendByRanking(int limit) {
        return em.createQuery("select g from Game g order by g.gameTotalScore desc", Game.class)
                .setMaxResults(limit)
                .getResultList();
    }

}

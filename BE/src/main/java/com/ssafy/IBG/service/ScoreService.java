package com.ssafy.IBG.service;

import com.ssafy.IBG.domain.Score;
import com.ssafy.IBG.repository.GameRepository;
import com.ssafy.IBG.repository.ScoreRepository;
import com.ssafy.IBG.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ScoreService {

    private final ScoreRepository scoreRepository;
    private final UserRepository userRepository;
    private final GameRepository gameRepository;

    /**
     * @author : 권오범
     * @date : 2022-03-23
     * @desc: 유저가 게임을 평가한 기록이 있다면 점수를 수정하고 없다면 새롭게 엔티티를 추가한다.
     **/
    @Transactional
    public boolean registScore(Integer userNo, Integer gameNo, Integer scoreRating){
        Score score = scoreRepository.findScoreByUserNoGameNo(userNo, gameNo);

        if(score != null){
            score.setScoreRating(scoreRating);
            return true;
        }

        return scoreRepository.saveScore(new Score(userRepository.findUserByUserNo(userNo), gameRepository.findGameByGameNo(gameNo), scoreRating));
    }

}

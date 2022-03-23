package com.ssafy.IBG.service;

import com.ssafy.IBG.domain.Game;
import com.ssafy.IBG.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class GameService {

    private final GameRepository gameRepository;

    /**
     * @author : 곽현준
     * @date : 2022-03-23 오후 5:49
     * @description : gameNo로 Game객체 검색
    **/
    public Game getGameByGameNo(int gameNo) {
        return gameRepository.findGameByGameNo(gameNo);
    }
}

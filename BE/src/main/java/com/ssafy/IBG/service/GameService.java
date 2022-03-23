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

    public Game getGameByGameNo(int gameNo) {
        return gameRepository.findGame(gameNo);
    }
}

package com.ssafy.IBG.service;

import com.ssafy.IBG.domain.Game;
import com.ssafy.IBG.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GameService {

    private final GameRepository gameRepository;

    public List<Game> findSearchGame(String searchName){
        return gameRepository.findSearchGame(searchName);
    }

    public Game findByGameName(String gameName){
        return gameRepository.findByGameName(gameName);
    }

    public Game findByGameNo(int gameNo){
        return gameRepository.findByGameNo(gameNo);
    }

    public List<Game> findByFilter(String gameName, Integer gamePlayer, Integer gameTime, double gameWeight, Integer gameAge, double gameScore, List<String> gameCategory) {
        return gameRepository.findByFilter(gameName, gamePlayer, gameTime, gameWeight, gameAge, gameScore, gameCategory);
    }
}

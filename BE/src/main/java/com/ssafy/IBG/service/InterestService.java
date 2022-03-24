package com.ssafy.IBG.service;

import com.ssafy.IBG.domain.Interest;
import com.ssafy.IBG.repository.GameRepository;
import com.ssafy.IBG.repository.InterestRepository;
import com.ssafy.IBG.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class InterestService {

    private final InterestRepository interestRepository;
    private final UserRepository userRepository;
    private final GameRepository gameRepository;

    /**
     * @author : 권오범
     * @date : 2022-03-23
     * @desc: 유거자 게임을 좋아요를 선택한 데이터가 있는 지 확인하고 없다면 엔티티를 생성하고 존재한다면 엔티티를 제거한다.
     **/
    @Transactional
    public boolean setInterestTransaction(Integer userNo, Integer gameNo){

        Interest interest = interestRepository.findInterestByUserNoGameNo(userNo, gameNo);

        try{
            if(interest == null) {
                interestRepository.saveInterest(new Interest(userRepository.findUserByUserNo(userNo), gameRepository.findGameByGameNo(gameNo)));
            }
            else
                interestRepository.removeInterest(interest);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        } finally {
            return true;
        }
    }


    /**
     * @author : 권오범
     * @date : 2022-03-23
     * @desc: 해당 유저가 좋아요 표시한 모든 데이터를 가져온다.
     **/
    public List<Interest> getInterestList(Integer userNo){
        return interestRepository.findInterestListByUserNo(userNo);
    }

}

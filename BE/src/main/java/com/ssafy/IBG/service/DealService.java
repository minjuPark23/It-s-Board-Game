package com.ssafy.IBG.service;

import com.ssafy.IBG.domain.Deal;
import com.ssafy.IBG.repository.DealRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DealService {

    private final DealRepository dealRepository;

    /**
     * @author : 곽현준
     * @date : 2022-03-23 오후 5:49
     * @desc : deal 객체 저장
    **/
    @Transactional
    public void saveDeal(Deal deal) {
        dealRepository.saveDeal(deal);
    }

    /**
     * @author : 곽현준
     * @date : 2022-03-27 오후 5:34
     * @desc : 전체 Deal List 가져오기
    **/
    public List<Deal> getDealList() {
        return dealRepository.findDeal();
    }

    /**
     * @author : 곽현준
     * @date : 2022-03-27 오후 5:50
     * @desc : 게임 이름으로 거래 내역 가져오기
    **/
    public List<Deal> getDealListByGameName(String gameName) {
        return dealRepository.findDealByGameName(gameName);
    }

    /**
     * @author : 곽현준
     * @date : 2022-03-27 오후 5:57
     * @desc : 거래 상세 가져오기
    **/
    public Deal getDealDetailByDealNo(int dealNo) {
        return dealRepository.findDealByDealNo(dealNo);
    }

    /**
     * @author : 곽현준
     * @date : 2022-03-27 오후 6:32
     * @desc : 거래 완료
    **/
    public Deal updateDealStatus(int dealNo) {
        Deal deal = dealRepository.findDealByDealNo(dealNo);
        if(deal == null) return null;
        deal.setDealStatus(true);
        return deal;
    }
}

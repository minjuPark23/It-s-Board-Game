package com.ssafy.IBG.service;

import com.ssafy.IBG.domain.Deal;
import com.ssafy.IBG.repository.DealRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DealService {

    private final DealRepository dealRepository;

    /**
     * @author : 곽현준
     * @date : 2022-03-23 오후 5:49
     * @description : deal 객체 저장
    **/
    @Transactional
    public void saveDeal(Deal deal) {
        dealRepository.saveDeal(deal);
    }
}

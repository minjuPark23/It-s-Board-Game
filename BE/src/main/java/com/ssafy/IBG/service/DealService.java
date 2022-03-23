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
     * 겨래 등록
     */
    @Transactional
    public void saveDeal(Deal deal) {
        dealRepository.saveDeal(deal);
    }
}

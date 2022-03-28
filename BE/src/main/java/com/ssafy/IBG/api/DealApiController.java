package com.ssafy.IBG.api;

import com.ssafy.IBG.api.deal.*;
import com.ssafy.IBG.api.dto.Result;
import com.ssafy.IBG.domain.Deal;
import com.ssafy.IBG.domain.Game;
import com.ssafy.IBG.domain.User;
import com.ssafy.IBG.service.DealService;
import com.ssafy.IBG.service.GameService;
import com.ssafy.IBG.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@Slf4j
@RestController
@RequiredArgsConstructor
public class DealApiController {

    private final DealService dealService;
    private final UserService userService;
    private final GameService gameService;

    private final DealUtil dealUtil;

    /**
     * @author : 곽현준
     * @date : 2022-03-23 오후 5:48
     * @desc : 거래내역 업로드
    **/
    @PostMapping("/deal")
    public Result saveDeal(DealSaveRequest request){

        Deal deal = new Deal();

        User user = userService.getUserByUserNo(request.getUserNo());
        Game game = gameService.getGameByGameNo(request.getGameNo());

        deal.setUser(user);
        deal.setGame(game);
        deal.setDealTitle(request.getDealTitle());
        deal.setDealContent(request.getDealContent());
        deal.setDealPrice(request.getDealPrice());

        // File Upload
        MultipartFile file = null;
        try{
            file = request.getFile();
            log.debug("origin file name = {}", file.getOriginalFilename());

            // 파일명
            String originFile = file.getOriginalFilename();

            // 확장자
            String originFileExtension = originFile.substring(originFile.lastIndexOf("."));

            // 저장 파일명
            // UUID클래스 - 특수문자를 포함한 문자를 랜덤으로 생성함.
            // "-"부분만 지워주고 마지막에 확장자 포함
            String storedFileName = UUID.randomUUID().toString().replaceAll("-", "") + originFileExtension;

            // 확장자 체크
            String fileType = dealUtil.getFileType(file);

            // file type이 지원하지 않는 경우
            if(fileType == null) {
                return new Result(HttpStatus.FORBIDDEN.value());
            }

            // 저장경로 : BE\image\yyyyMMdd\HHmmss\storedFileName
            Date date = new Date();
            String dateStr = new SimpleDateFormat("yyyyMMdd").format(date);
            String timeStr = new SimpleDateFormat("HHmmss").format(date);

            // 날짜 경로 지정, 경로 없는 경우 폴더 만듦
            String filePath = System.getProperty("user.dir") + File.separator + "image" + File.separator + dateStr;
            dealUtil.makeDir(filePath);

            // 시간 경로 지정, 경로 없는 경우 폴더 만듦
            filePath += File.separator + timeStr;
            dealUtil.makeDir(filePath);

            // 해당 파일 객체 생성
            File savedFile = new File(filePath + File.separator + storedFileName);

            // 파일 저장
            file.transferTo(savedFile);

            // 각 항목 Dto 저장
            deal.setDealFileName(originFile);
            deal.setDealSavedName(storedFileName);
            deal.setDealPath(filePath);

        }catch (Exception e) { // 저장 위치 찾지 못하는 경우 92line에서 오류 발생, 417에러 return함.
            return new Result(HttpStatus.EXPECTATION_FAILED.value(), e);
        }

        // deal 엔티티 저장
        boolean isSaved = dealService.saveDeal(deal);
        if(!isSaved) return new Result(HttpStatus.SERVICE_UNAVAILABLE.value());

        return new Result(HttpStatus.OK.value());
    }

    /**
     * @author : 곽현준
     * @date : 2022-03-27 오후 5:32
     * @desc : 전체 거래 목록
    **/
    @GetMapping("/deal")
    public Result getDealList() {
        List<Deal> dealList = dealService.getDealList();
        if(dealList == null) return new Result(HttpStatus.NO_CONTENT.value());
        List<DealResponse> collect = dealList.stream()
                .map(deal -> new DealResponse(
                        deal.getDealNo(),
                        deal.getUser().getUserNo(),
                        deal.getGame().getGameNo(),
                        deal.getDealTitle(),
                        deal.getDealContent(),
                        deal.getDealFileName(),
                        deal.getDealSavedName(),
                        deal.getDealPath(),
                        deal.getDealPrice(),
                        deal.getDealReg(),
                        deal.isDealStatus()
                ))
                .collect(Collectors.toList());
        return new Result(HttpStatus.OK.value(), collect);
    }
    
    /**
     * @author : 곽현준
     * @date : 2022-03-27 오후 5:46
     * @desc : 게임 이름으로 거래 목록
    **/
    @PostMapping("/deal/search")
    public Result getDealListByGameName(@RequestBody DealSearchRequest dealSearchRequest) {
        List<Deal> dealList = dealService.getDealListByGameName(dealSearchRequest.getGameName());
        if(dealList == null) return new Result(HttpStatus.NO_CONTENT.value());
        List<DealResponse> collect = dealList.stream()
                .map(deal -> new DealResponse(
                        deal.getDealNo(),
                        deal.getUser().getUserNo(),
                        deal.getGame().getGameNo(),
                        deal.getDealTitle(),
                        deal.getDealContent(),
                        deal.getDealFileName(),
                        deal.getDealSavedName(),
                        deal.getDealPath(),
                        deal.getDealPrice(),
                        deal.getDealReg(),
                        deal.isDealStatus()
                ))
                .collect(Collectors.toList());
        return new Result(HttpStatus.OK.value(), collect);
    }

    /**
     * @author : 곽현준
     * @date : 2022-03-27 오후 5:56
     * @desc : 거래 상세 가져오기
    **/
    @GetMapping("/deal/{dealNo}")
    public Result getDealDetail(@PathVariable int dealNo) {
        Deal deal = dealService.getDealDetailByDealNo(dealNo);
        if(deal == null) return new Result(HttpStatus.NO_CONTENT.value());
        DealResponse dealResponse = new DealResponse(
                deal.getDealNo(),
                deal.getUser().getUserNo(),
                deal.getGame().getGameNo(),
                deal.getDealTitle(),
                deal.getDealContent(),
                deal.getDealFileName(),
                deal.getDealSavedName(),
                deal.getDealPath(),
                deal.getDealPrice(),
                deal.getDealReg(),
                deal.isDealStatus()
        );
        return new Result(HttpStatus.OK.value(), dealResponse);
    }

    /**
     * @author : 곽현준
     * @date : 2022-03-27 오후 6:13
     * @desc : 거래완료
    **/
    @PutMapping("/deal")
    public Result updateDealStatus(@RequestBody DealUpdateRequest dealUpdateRequest) {
        Deal deal = dealService.updateDealStatus(dealUpdateRequest.getDealNo());
        if(deal == null) return new Result(HttpStatus.NO_CONTENT.value());
        return new Result(HttpStatus.OK.value());
    }
}

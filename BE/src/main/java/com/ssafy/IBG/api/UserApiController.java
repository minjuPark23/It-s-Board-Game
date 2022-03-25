package com.ssafy.IBG.api;

import com.ssafy.IBG.api.user.*;
import com.ssafy.IBG.domain.Interest;
import com.ssafy.IBG.api.dto.Result;
import com.ssafy.IBG.domain.User;
import com.ssafy.IBG.service.GameService;
import com.ssafy.IBG.service.InterestService;
import com.ssafy.IBG.service.ScoreService;
import com.ssafy.IBG.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class UserApiController {

    private final UserService userService;
    private final InterestService interestService;
    private final ScoreService scoreService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    /**
     * @author : 권오범
     * @date : 2022-03-23
     * @desc: 유저 회원 가입
     **/
    @PostMapping("/join")
    public Result join(@RequestBody UserJoinRequest request){

        User user = new User();
        String encPwd = bCryptPasswordEncoder.encode(request.getUserPwd());

        user.setUserEmail(request.getUserEmail());
        user.setUserNick(request.getUserNick());
        user.setUserPwd(encPwd);

        if(userService.join(user)){
            return new Result(HttpStatus.OK.value());
        }else{
            return new Result(HttpStatus.CONFLICT.value());
        }
    }

    /**
     * @author : 권오범
     * @date : 2022-03-23
     * @desc: 회원가입 시 이메일 중복 체크
     **/
    @PostMapping("/email")
    public Result emailVerify(@RequestBody UserConfirmRequest request){

        if(userService.confirmEmail(request.getUserEmail()))
            return new Result(HttpStatus.OK.value());

        return new Result(HttpStatus.CONFLICT.value());
    }

    /**
     * @author : 권오범
     * @date : 2022-03-23
     * @desc: 회원가입 시 닉네임 중복 체크
     **/
    @PostMapping("/nickname")
    public Result nickVerify(@RequestBody UserConfirmRequest request){
        if(userService.confirmNick(request.getUserNick()))
            return new Result(HttpStatus.OK.value());

        return new Result(HttpStatus.CONFLICT.value());
    }

    /**
     * @author : 권오범
     * @date : 2022-03-23
     * @desc: 회원번호로 회원 정보 조회하기
     **/
    @GetMapping("/user/account/{userNo}")
    public Result getUserInfo(@PathVariable("userNo") Integer userNo){
        User user = userService.getUserByUserNo(userNo);

        if(user == null)
            return new Result(HttpStatus.CONFLICT.value());

        UserInfoResponse response = new UserInfoResponse(user.getUserNo(), user.getUserEmail(), user.getUserNick());
        return new Result(HttpStatus.OK.value(), response);
    }

    /**
     * @author : 권오범
     * @date : 2022-03-23
     * @desc: 유저의 게임별 좋아요 등록 및 해제
     **/
    @PostMapping("/user/like")
    public Result setInterestTransaction(@RequestBody UserInterestRequest request){

        if(interestService.setInterestTransaction(request.getUserNo(), request.getGameNo()))
            return new Result(HttpStatus.OK.value());

        return new Result(HttpStatus.CONFLICT.value());
    }

    /**
     * @author : 권오범
     * @date : 2022-03-23
     * @desc: 유저가 좋아요한 목록 가져오기
     **/
    @GetMapping("/user/like/{userNo}")
    public Result getInterestListByUserNo(@PathVariable("userNo") Integer userNo){
        List<Interest> list = interestService.getInterestList(userNo);

        if(list.isEmpty())
            return new Result(HttpStatus.NO_CONTENT.value());

        List<UserInterestResponse> collect = list.stream()
                .map(i -> {
                    /** game에 대한 user like 전달 **/
                    return new UserInterestResponse(i.getGame(), true);
                })
                .collect(Collectors.toList());

        return new Result(HttpStatus.OK.value(), collect);
    }

    /**
     * @author : 권오범
     * @date : 2022-03-23
     * @desc: 유저의 게임별 별점 등록 및 수정
     **/
    @PostMapping("/user/score")
    public Result setScore(@RequestBody UserScoreRequest request){
        if(!scoreService.registScore(request.getUserNo(), request.getGameNo(), request.getScoreRating()))
            return new Result(HttpStatus.CONFLICT.value());

        return new Result(HttpStatus.OK.value());
    }

}
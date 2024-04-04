package com.example.nowpt.mvc.schedule;


import com.example.nowpt.mvc.service.MapperService;
import com.example.nowpt.mvc.service.memo.MemoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class SchedulerService {
    private final MapperService mapperService;
    private final MemoService memoService;

    //fixedDelay	이전 작업이 종료된 후 설정 시간만큼 기다린 후에 시작한다. (밀리세컨드) @Scheduled(fixedDelay = 1000)

    //fixedRate		이전 작업이 종료되지 않아도 설정된 시간마다 시작한다. (밀리세컨드) @Scheduled(fixedRate = 1000)

    //initialDelay	작업 시작 시, 설정된 시간만큼 기다린 후 시작한다. (밀리세컨드) @Scheduled(fixedRate = 1000, initialDelay = 2000)

    //cron	원하는 시간대를 설정하여 작업을 실행한다.//@Scheduled(cron = "* * * * * *")
    //(초(0-59), 분(0-59), 시간(0-23), 일(1-31), 월(1-12), 요일(1-7, 1:일, 7:토))

    //zone	시간대를 설정 한다. 미설정 시 로컬 시간대가 적용된다.
    //@Scheduled(cron = "* * * * * *", zone = "Asia/Seoul")

    //메소드 위에 @Scheduled 어노테이션을 선언하면 스케줄에 등록되고 설정한 시간마다 실행됨.
    @Scheduled(cron = "0  0/10  *  *  * *")
    public void testSchedule(){
        log.debug("[배치] 10분마다 실행 ");
        log.debug(mapperService.selectAllMember().toString());
    }



    public void clearTrashMemo(){
        log.debug("삭제된 메모 개수 : {}",memoService.clearTrashMemo());

    }





//    @Scheduled(cron = "0  0/1  *  *  * *")
//    public void testNotice(){
//        log.debug("[배치 노티스] ");
//        mapperService.noticeN();
//    }




}

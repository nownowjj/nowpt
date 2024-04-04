package com.example.nowpt.mvc.schedule;

import com.example.nowpt.mvc.service.memo.MemoService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest

public class SchedulerServiceTest {
    @Autowired private MemoService memoService;
    @Test
    public void clearTrashMemo(){
        long count = memoService.clearTrashMemo();
        System.out.println("삭제된 메모 개수 " + count);

    }
}
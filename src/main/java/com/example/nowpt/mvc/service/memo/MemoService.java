package com.example.nowpt.mvc.service.memo;

import com.example.nowpt.cmm.utils.DateUtils;
import com.example.nowpt.mvc.dto.MemoDto;
import com.example.nowpt.mvc.model.Memo;
import com.example.nowpt.mvc.repository.memo.MemoRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemoService {
    private final MemoRepo memoRepo;

    public Memo upsertMemo(MemoDto memoDto) {
        return this.saveMemoFromDto(memoDto);
    }

    private Memo saveMemoFromDto(MemoDto memoDto) {
        Memo memo = memoDto.getMemoSn() != null ?  memoRepo.findByMemoSn(memoDto.getMemoSn()) : new Memo();
        this.setMemoTitleAndContent(memo, memoDto);
        memo.setMemberSn(memoDto.getMemberSn());
        memo.setUseYn(memoDto.getUseYn());
        return memoRepo.save(memo);
    }



    private void setMemoTitleAndContent(Memo memo , MemoDto memoDto) {
        String title = memoDto.getTitle();
        String content = memoDto.getContent();
        memo.setTitle(title.isEmpty() ? "제목없는 메모 " + DateUtils.getTodayYmd() : title);
        memo.setContent(content.isEmpty() ? "빈 메모장" : content);
    }


    public boolean deleteMemo(List<Long> deleteLists) {
        return memoRepo.updateByMemoSnIn(deleteLists) > 0;
    }
}
package com.example.nowpt.mvc.repository.memo;

import com.example.nowpt.mvc.model.Memo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemoRepo extends JpaRepository<Memo, Long> , MemoCustomRepo {
//    List<Memo> findAllByMemberSn(long membSn);
    List<Memo> findAllByMemberSnAndUseYn(long membSn, String useYn);
    Memo findByMemoSn(long memoSn);
}

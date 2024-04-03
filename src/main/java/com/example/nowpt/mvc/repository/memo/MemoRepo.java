package com.example.nowpt.mvc.repository.memo;

import com.example.nowpt.mvc.model.Memo;
import feign.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface MemoRepo extends JpaRepository<Memo, Long> , MemoCustomRepo {
//    List<Memo> findAllByMemberSn(long membSn);
    List<Memo> findAllByMemberSnAndUseYn(long membSn, String useYn);
    Memo findByMemoSn(long memoSn);

    @Modifying
    @Transactional
    @Query("UPDATE Memo m SET m.useYn = 'N' WHERE m.memoSn IN :deleteLists")
    int updateByMemoSnIn(@Param("deleteLists") List<Long> deleteLists);
}

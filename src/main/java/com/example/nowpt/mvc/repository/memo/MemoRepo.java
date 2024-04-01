package com.example.nowpt.mvc.repository.memo;

import com.example.nowpt.mvc.model.Memo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemoRepo extends JpaRepository<Memo, Long> , MemoCustomRepo {

}

package com.example.nowpt.mvc.repository.comment;

import com.example.nowpt.mvc.dto.CommentDto;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentCustomRepo {

    List<CommentDto> selectComments(long calendarSn);
}

package com.example.nowpt.mvc.repository.comment;

import com.example.nowpt.mvc.model.Calendar;
import com.example.nowpt.mvc.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepo extends JpaRepository<Comment, Long> , CommentCustomRepo {
}

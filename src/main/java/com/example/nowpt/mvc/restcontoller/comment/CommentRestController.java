package com.example.nowpt.mvc.restcontoller.comment;

import com.example.nowpt.cmm.code.Cd;
import com.example.nowpt.cmm.rvo.ResponseDto;
import com.example.nowpt.cmm.rvo.ResponseUtil;
import com.example.nowpt.mvc.dto.CommentDto;
import com.example.nowpt.mvc.model.Comment;
import com.example.nowpt.mvc.model.Member;
import com.example.nowpt.mvc.repository.comment.CommentRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/auth/comment")
public class CommentRestController {
    private final CommentRepo commentRepo;

    @PostMapping("")
    public ResponseDto<?> insertComment(@AuthenticationPrincipal Member member , @RequestBody CommentDto commentDto){
        log.debug("댓글등록 : {}"  , commentDto);

        Comment comment = new Comment();
        comment.setCommentContent(commentDto.getCommentContent());
        comment.setMemberSn(member);
        comment.setCalendarSn(commentDto.getCalendarSn());
        comment.setFrstRegistDt(LocalDateTime.now());
        comment.setLastChangeDt(LocalDateTime.now());
        commentRepo.save(comment);

        return ResponseUtil.SUCCESS(Cd.SELECT_SUCCESS, comment);
    }

    @GetMapping("")
    public ResponseDto<?> selectComment(@RequestParam long calendarSn){
        log.debug("댓글 조회  : {}"  , calendarSn);
        List<CommentDto> comments = commentRepo.selectComments(calendarSn);

        return ResponseUtil.SUCCESS(Cd.SELECT_SUCCESS, comments);
    }
}

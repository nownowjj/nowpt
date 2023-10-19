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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/auth/comment")
public class CommentRestController {
    private final CommentRepo commentRepo;

    @PostMapping("")
    public ResponseDto<?> selectRecordDate(@AuthenticationPrincipal Member member , @RequestBody CommentDto commentDto){
        log.debug("기록 일자 리스트 조회 : {}"  , commentDto);
        log.debug("기록 일자 리스트 조회 member : {}"  ,member);

        Comment comment = new Comment();
        comment.setCommentContent(commentDto.getCommentContent());
        comment.setMemberSn(member);
        comment.setCalendarSn(commentDto.getCalendarSn());
        comment.setFrstRegistDt(LocalDateTime.now());
        comment.setLastChangeDt(LocalDateTime.now());
        commentRepo.save(comment);

        return ResponseUtil.SUCCESS(Cd.SELECT_SUCCESS, comment);
    }
}

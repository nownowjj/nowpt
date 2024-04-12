package com.example.nowpt.mvc.service;

import com.example.nowpt.mvc.common.CustomException;
import com.example.nowpt.mvc.dto.EmailRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;


@Service
@Slf4j
@RequiredArgsConstructor
public class MailService {
    private final JavaMailSender javaMailSender;


    /**
     * @param to => 발송 대상 email ,
     *  1. 발송 대상 email 과 생성한 인증 코드를 db에 insert 시킨다
     */
    public boolean sendEmail(EmailRequest emailRequest) {



        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(emailRequest.getTo());
            helper.setSubject(emailRequest.getSubject());
            helper.setText(emailRequest.getBody());
            javaMailSender.send(message);
            return true; // 발송 성공 시 true 반환
        } catch (MessagingException e) {
            throw new CustomException("메일 발송 실패 : " + e.getMessage());
        }
    }


    // 랜덤 인증번호 생성 함수
    public String createAuthenticationCode() {
        // 8자리, 문자, 숫자 포함 문자열 생성
        return RandomStringUtils.random(8, true, true);
    }

}

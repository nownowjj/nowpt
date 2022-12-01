package com.example.nowpt.cmm.security;

import com.example.nowpt.cmm.code.ApiCd;
import com.example.nowpt.cmm.rvo.RVO;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@Component
@Slf4j
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

	@Override
	public void handle(HttpServletRequest request, HttpServletResponse response,
			AccessDeniedException accessDeniedException) throws IOException, ServletException {
		log.debug("[CustomAccessDeniedHandler] {}, {}, {}", request, response, accessDeniedException);
		log.debug("[CustomAccessDeniedHandler] {}", request.getRequestURI());	
		if(request.getRequestURI().startsWith("/api")) {
			request.setCharacterEncoding("UTF-8");
			response.setCharacterEncoding("UTF-8");
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			PrintWriter out = response.getWriter();
			response.setContentType("application/json; charset=UTF-8");
			out.print(new Gson().toJson(RVO.builder().msg("인가에 실패 하였습니다.").data(accessDeniedException.getMessage()).code(ApiCd.NOT_AUTH).build()));
		} else {
			//response.sendRedirect("/public/login");
			//response.sendError(HttpServletResponse.SC_UNAUTHORIZED, accessDeniedException.getMessage());
			response.sendRedirect("/error");
		}
	}

}

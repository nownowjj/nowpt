package com.example.nowpt.cmm.filters;

import com.example.nowpt.cmm.security.CustomUserDetailService;
import com.example.nowpt.cmm.security.JwtTokenProvider;
import io.jsonwebtoken.Claims;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter{
	@Autowired private CustomUserDetailService cds;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		// 헤더에서 JWT 를 받아옵니다.
		log.debug("[요청 url]{}",request.getRequestURI());
		log.debug("[요청 header]{}",request.getHeader("accessToken"));
		log.debug("[JwtAuthenticationFilter]{}, {}", request.getRequestURI(), request.getHeader("Authorization"));
		
		if(request.getRequestURI().startsWith("/api")) {
			log.debug("jwt 인증 진행");
			// SecurityContext 에 Authentication 객체를 저장합니다.
			SecurityContextHolder.getContext().setAuthentication(null);
			request.setAttribute("isApi", true);
			request.getSession().invalidate();
			jwtAuthStart(request);
		}else {
			request.setAttribute("isApi", false);
		}
		filterChain.doFilter(request, response);
	}

	private void jwtAuthStart(HttpServletRequest req) {
		log.debug("jwtAuthStart");

		try {
			String jwt = getJwtFromRequest(req);

			log.debug("jwt is {}", jwt);
			log.debug("cds is {}", cds);
			if(jwt != null && JwtTokenProvider.validateToken(jwt)) {
				Claims claims = JwtTokenProvider.getClaims(jwt);
				String membId = String.valueOf(claims.get("membId"));
				UserDetails ud = cds.loadUserByUsername(membId);
				log.debug("ud@{}",ud);
				UsernamePasswordAuthenticationToken upat = new UsernamePasswordAuthenticationToken(ud, null, ud.getAuthorities());
				log.debug("upat@{}",upat);
				upat.setDetails(new WebAuthenticationDetailsSource().buildDetails(req));
				SecurityContextHolder.getContext().setAuthentication(upat);
			}
		} catch (Exception e) {
			e.printStackTrace();
			log.debug("인증과정중 오류 발생, {}", e.getMessage());
			throw new RuntimeException(e.getMessage());
		}
	}

	private String getJwtFromRequest(HttpServletRequest req) {
		String bearerToken = req.getHeader("Authorization");
		if(bearerToken != null && bearerToken.startsWith("Bearer ")) {
			return bearerToken.substring("Bearer ".length());
		}
		return null;
	}
}

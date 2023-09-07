package com.example.nowpt.cmm.security;

import com.example.nowpt.mvc.model.Member;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
public class JwtTokenProvider {

	/**
	 * static 변수에 대하여 @Value annotation 이 동작하지 않는다.
	 * 이를 해결하기 위해서는 static 이 아닌 setter 메소드를 추가하여 static 변수에 직접적으로 값을 넣을 수 있도록 하면 된다.
	 */
	private static String JWT_SECRET;
	@Value("${jwt.secret}")
	public void setJwtSecret(String value){
		JWT_SECRET = value;
	}

	private final static int JWT_EXPIRATION_MS = 100000 * 60 * 60;

	public static String generateToken(String id, String pw, String authority , String email , String profileImage , Long memberSn) {
		Map<String, Object> claims = new HashMap<>();
//		log.debug("토큰 프로바이드 {}");
		log.debug("권한 : {}",authority);
		log.debug("[토큰정보] : {}, : {} , : {} , : {}",authority,id,pw , profileImage);

		claims.put("membId", id);
		claims.put("membPw", pw);
		claims.put("membEmail", email);
		claims.put("roles", authority);
		claims.put("profileImage", profileImage);
		claims.put("membSn", memberSn);

		return Jwts.builder()
				.setClaims(claims)
				.setIssuedAt(new Date())
				.setExpiration(new Date(new Date().getTime() + JWT_EXPIRATION_MS))
				.signWith(SignatureAlgorithm.HS512, JWT_SECRET)
				.compact();
	}
	public static Claims getClaims(String jwt) {
		Claims claims = Jwts.parser()
				.setSigningKey(JWT_SECRET)
				.parseClaimsJws(jwt)
				.getBody();
		return claims;
	}
	
	public static boolean validateToken(String token) {
		return validateTokenSub(token, null);
	}
	
	public static boolean validateToken(String token, HttpServletRequest req) {
		return validateTokenSub(token, req);
	}
	
	private static boolean  validateTokenSub(String token, HttpServletRequest req) {
		try {
			Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(token);
			return true;
		} catch (SignatureException ex) {
			String err = "JWT 사이닝이 오류";
			log.error(err);
			if(req != null) req.setAttribute("unauthorization", err);
		} catch (MalformedJwtException ex) {
			String err = "JWT 잘못됨 MalformedJwtException";
			log.error(err);
			if(req != null) req.setAttribute("unauthorization", err);
		} catch (ExpiredJwtException ex) {
			String err = "JWT 만료";
			log.error(err);
			if(req != null) req.setAttribute("unauthorization", err);
		} catch (UnsupportedJwtException ex) {
			String err = "JWT 지원하지 않는 형식";
			log.error(err);
			if(req != null) req.setAttribute("unauthorization", err);
		} catch (IllegalArgumentException ex) {
			String err = "JWT 잘못됨 IllegalArgumentException";
			log.error(err);
			if(req != null) req.setAttribute("unauthorization", err);
		}
		return false;
	}
}
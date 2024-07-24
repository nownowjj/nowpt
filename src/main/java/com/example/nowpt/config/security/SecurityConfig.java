package com.example.nowpt.config.security;

import com.example.nowpt.cmm.filters.JwtAuthenticationFilter;
import com.example.nowpt.cmm.security.AuthEntryPoint_DENIED;
import com.example.nowpt.cmm.security.CustomAccessDeniedHandler;
import com.example.nowpt.cmm.security.CustomAuthenticationProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter{
	@Autowired private AuthEntryPoint_DENIED aep;
	@Autowired private JwtAuthenticationFilter jwtFilter;
	@Autowired private CustomAccessDeniedHandler cad;
	@Autowired private CustomAuthenticationProvider cap;

	@Bean
	public PasswordEncoder pe() {
		return new BCryptPasswordEncoder();
	}
	
	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring().antMatchers( "/error/**","/static/css/**","/static/js/**","/favicon.ico","/static/**","/manifest.json","/logo192.png","/go/**");
	}
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.authenticationProvider(cap);
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {

		http.cors().and().csrf().disable()
				.exceptionHandling()
					.authenticationEntryPoint(aep)
					.accessDeniedHandler(cad)
				.and()
				.authorizeHttpRequests()
					.antMatchers( "/", "/index.html", "/static/**", "/*.js", "/*.css","/api/auth/**","/error","/oauth/**","/api/notice/auth/**","/chat/**","/ws/**","/socket/**","/page/**").permitAll() // /auth/**에 대한 접근을 인증 절차 없이 허용(로그인 관련 url)
					.antMatchers("/api/test/**","/api/notice/admin/**","/api/admin/**").hasAuthority("ROLE_ADMIN")
					.antMatchers("/api/common/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_SELLER", "ROLE_USER")
					.antMatchers("/{x:^(?!api$).*$}/**").permitAll() // 모든 비-API 요청을 허용 (추가된 부분) 24.07.24
					.anyRequest().authenticated() // 위에서 따로 지정한 접근허용 리소스 설정 후 그 외 나머지 리소스들은 무조건 인증을 완료해야 접근 가능
				.and()
				.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class); // 커스텀 필터 등록하며, 기존에 지정된 필터에 앞서 실행
	}
}

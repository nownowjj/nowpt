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
		web.ignoring().antMatchers( "/error/**","/static/css/**","/static/js/**");
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
					.antMatchers( "/api/**","/api/auth/**","/error").permitAll()
					.antMatchers("/api/*/admin/**").hasAuthority("ROLE_ADMIN")
//					.antMatchers("/api/*/seller/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_SELLER")
					.antMatchers("/api/*/seller/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_SELLER")
					.antMatchers("/api/*/user/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_SELLER", "ROLE_USER")
					.antMatchers("/public/**", "/api/**").permitAll()
					.anyRequest().authenticated()
				.and()
				// 웹 시큐리티 전 'authenticationJwtTokenFilter(토큰 유효성 검사 및 토큰을 기반으로 사용자 정보 설정하는 필터)' 라는 필터를 거치도록 설정.
//				.formLogin()
//					.loginPage("/api/v2/auth/sellerLogin")
//					.loginProcessingUrl("/api/v2/auth/sellerLogin")// 로그인 Form Action Url, default: /login
//					.defaultSuccessUrl("/api/v2/seller/sellerMain")// 로그인 성공 후 이동 페이지
//					.usernameParameter("memb_id")
//					.passwordParameter("memb_pw")
//					.failureUrl("/api/v2/auth/login/error")
//					.failureUrl("/api/v2/auth/sellerLogin") // 로그인 실패 후 이동 페이지
//				.and()
//				.logout()
//					.logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
//					.logoutSuccessUrl("/api/v1/thymeleaf/test")
//					.invalidateHttpSession(true)
//				.and()
				.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
	}
}

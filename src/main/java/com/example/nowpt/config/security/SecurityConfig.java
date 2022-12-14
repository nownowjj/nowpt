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
					.antMatchers( "/","/api/auth/**","/error","/oauth/**","/api/notice/auth/**").permitAll() // /auth/**??? ?????? ????????? ?????? ?????? ?????? ??????(????????? ?????? url)
					.antMatchers("/api/test/**","/api/notice/admin/**").hasAuthority("ROLE_ADMIN")
					.antMatchers("/api/common/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_SELLER", "ROLE_USER")
					.anyRequest().authenticated() // ????????? ?????? ????????? ???????????? ????????? ?????? ??? ??? ??? ????????? ??????????????? ????????? ????????? ???????????? ?????? ??????
				.and()
				.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class); // ????????? ?????? ????????????, ????????? ????????? ????????? ?????? ??????
	}
}

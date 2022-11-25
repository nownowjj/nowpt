package com.example.nowpt.cmm.rest;

import lombok.extern.slf4j.Slf4j;
import org.apache.http.client.HttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
@Slf4j
public class ApiCallRestAdapter extends RestTemplateAdapterAbstract {

	private HttpComponentsClientHttpRequestFactory apiFactory = null;
	private RestTemplate apiRestTemplate = null;

	@Override
	protected RestTemplate getRestTemplate() {
		if(this.apiRestTemplate == null) {
			buildFactory();
			this.apiRestTemplate = new RestTemplate(this.apiFactory);
			log.info("[Init] Factory initialize. factory= {}", this.apiFactory.toString());
		}
		return this.apiRestTemplate;
	}

	@Override
	protected void setRequestFactory() {
	}

	@Override
	protected boolean isProfilePrd() {
		return false; // 환경에 따르지 않아아도 된다. 환경에 따라도 상관없다.
	}

	/**
	 *	(*1) 읽기시간초과 (ms), 연결시간초과 (ms)
	 *	(*2) Connection Pool 설정. 동기실행에 사용될 HttpClient 세팅
	 */
	private void buildFactory() {
		HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
		factory.setReadTimeout(5000); //(*1) 5 sec
		factory.setConnectTimeout(3000); //(*1) 3 sec

		HttpClient httpClient = HttpClientBuilder.create()
				.setMaxConnTotal(100) //(*2)
				.setMaxConnPerRoute(5) //(*2)
				.build();
		factory.setHttpClient(httpClient); //(*2)
		this.apiFactory = factory;
	}

}
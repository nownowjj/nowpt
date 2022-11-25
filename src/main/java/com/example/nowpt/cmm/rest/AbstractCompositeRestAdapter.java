package com.example.nowpt.cmm.rest;

import lombok.extern.slf4j.Slf4j;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpEntityEnclosingRequestBase;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.config.Registry;
import org.apache.http.config.RegistryBuilder;
import org.apache.http.conn.socket.ConnectionSocketFactory;
import org.apache.http.conn.socket.PlainConnectionSocketFactory;
import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.ui.ModelMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import java.net.URI;
import java.security.cert.X509Certificate;
import java.util.Map;

@Slf4j
public abstract class AbstractCompositeRestAdapter extends RestTemplateAdapterAbstract {

	//	(*1) connectionTime을 사용하지 않고 있다. (from 안대리)
	//		connection pool 사용하면서 사용하지 않게 된 것 같다고 함.
	// 		default를 5분 = 5 x 60 = 300 sec
	//	(*2) 현재 사용하지 않아 주석처리 됨

	//@Value("${caas.service.connect.timeout:300}") private int connectTimeout; //(*1)
	@Value("${spring.profiles.active}") private String profilesActive;
	@Autowired RestTemplate restTemplate;

	//protected List<HttpMessageConverter<?>> messageConverters = null; //(*2)
	protected ClientHttpRequestFactory factory = null;
	
	@Bean
	public static RestTemplate getRestTemplateBean() {
		return new RestTemplate();
	}

	/* ==================================================================================
	 * 추가 제공 메소드
	 */

	/**
	 * RestTemplate GET + variations
	 * @param String url : api 경로
	 * @param Map<String, Object> request : 요청 body
	 * @return ModelMap
	 */
	public ModelMap get(String serviceUrl, String url, Map<String, Object> request) {
		//get 기본형. REST API가 requestParam으로 받는 경우
		return get(serviceUrl + url, request);
	}
	public ModelMap getWithBody(String serviceUrl, String url, Map<String, Object> request) {
		//get 바디형. REST API가 requestBody으로 받는 경우. JSON으로 전달
		return getWithBody(serviceUrl + url, request);
	}
	public ModelMap getWithBody(String serviceUrl, String url, MultiValueMap<String, Object> request) {
		//get 바디형. REST API가 requestBody으로 받는 경우. JSON으로 전달
		return getWithBody(serviceUrl + url, request);
	}
	public ModelMap getWithBody(String serviceUrl, String url) {
		return getWithBody(serviceUrl, url, (Map<String, Object>)null);
	}

	public ModelMap get(String serviceUrl, String url) {
		return get(serviceUrl, url, null);
	}
	public ModelMap getQry(String serviceUrl, String url) {
		return exchangeCall(serviceUrl + url, HttpMethod.GET, null, false);
	}

	/**
	 * RestTemplate POST + variations
	 * @param String url : api 경로
	 * @param Map<String, Object> request : 요청 body
	 * @return ModelMap
	 */
	public ModelMap post(String serviceUrl, String url, Map<String, Object> request) {
		//post 기본형
		return post(serviceUrl + url, request);
	}
	public ModelMap post(String serviceUrl, String url, MultiValueMap<String, Object> request) {
		//post 기본형
		return post(serviceUrl + url, request);
	}

	/**
	 * RestTemplate PUT + variations
	 * @param String url : api 경로
	 * @param Map<String, Object> request : 요청 body
	 * @return ModelMap
	 */
	public ModelMap put(String serviceUrl, String url, Map<String, Object> request) {
		//put 기본형
		return put(serviceUrl + url, request);
	}
	public ModelMap put(String serviceUrl, String url, MultiValueMap<String, Object> request) {
		//put 기본형
		return put(serviceUrl + url, request);
	}

	/**
	 * RestTemplate DELETE + variations
	 * @param String url : api 경로
	 * @param Map<String, Object> request : 요청 body
	 * @return ModelMap
	 */
	public ModelMap delete(String serviceUrl, String url, Map<String, Object> request) {
		//delete 기본형
		return delete(serviceUrl + url, request);
	}
	public ModelMap deleteWithBody(String serviceUrl, String url, Map<String, Object> request) {
		//delete 바디형
		return deleteWithBody(serviceUrl + url, request);
	}
	public ModelMap deleteWithBody(String serviceUrl, String url, MultiValueMap<String, Object> request) {
		//delete 바디형
		return deleteWithBody(serviceUrl + url, request);
	}

	/* ==================================================================================
	 * 상속 및 구현
	 */

	@Override
	public RestTemplate getRestTemplate() {
		//2019.08.26 sleuth span id 전달을 위해 새로 construct 하지 않고 Bean으로 만들어 Autowired로 사용해야 interceptor가 정상적으로 주입된다.
		// https://cloud.spring.io/spring-cloud-static/spring-cloud-sleuth/1.2.1.RELEASE/#_synchronous_rest_template
		// async 방식이 적용될 경우 공식문서 참조 필요
		//RestTemplate restTemplate = new RestTemplate(); 

		// 메시지 컨버터 설정 
//		if (messageConverters != null) {
//			restTemplate.setMessageConverters(messageConverters);
//		}
		
		// 팩토리 설정
		if (factory == null) {
			setDefaultRequestFactory();
			log.info("[RestTemplate] init set requestFactory");
		}
		restTemplate.setRequestFactory(factory);
		return restTemplate;
	}

	@Override
	protected void setRequestFactory() {
		setCustomRequestFactory();
	}

	@Override
	protected boolean isProfilePrd() {
		return "prd".equals(profilesActive);
	}

	/**
	 * MessageConverter 설정
	 */
//	protected void setFromMessageConverter() {
//		// StringConverter
//		StringHttpMessageConverter stringHttpMessageConverter = new StringHttpMessageConverter(getCharset());
//		stringHttpMessageConverter.setWriteAcceptCharset(true);
//
//		// FormConverter
//		List<HttpMessageConverter<?>> partConverters = new ArrayList<>();
//		partConverters.add(new ByteArrayHttpMessageConverter());
//		partConverters.add(stringHttpMessageConverter);
//		partConverters.add(new ResourceHttpMessageConverter());
//
//		FormHttpMessageConverter formHttpMessageConverter = new FormHttpMessageConverter();
//		formHttpMessageConverter.setCharset(getCharset());
//		formHttpMessageConverter.setPartConverters(partConverters);
//
//		List<HttpMessageConverter<?>> messageConverters = new ArrayList<>();
//		messageConverters.add(formHttpMessageConverter);
//		messageConverters.add(stringHttpMessageConverter);
//
//		this.messageConverters = messageConverters;
//	}

	/**
	 *	(*1) DefaultRequestFactory 설정
	 *	(*2) CustomRequestFactory 설정 : json body 전달 시 사용
	 */
	private void setDefaultRequestFactory() { //(*1)
		setRequestFactorySub(false);
	}
	private void setCustomRequestFactory() { //(*2)
		setRequestFactorySub(true);
	}
	private void setRequestFactorySub(boolean bodyOn) {
		try {
			SSLContext sslContext = SSLContext.getInstance("SSL");
			sslContext.init( null, UNQUESTIONING_TRUST_MANAGER, null );
			SSLConnectionSocketFactory sslFactory = new SSLConnectionSocketFactory(sslContext, NoopHostnameVerifier.INSTANCE);
			Registry<ConnectionSocketFactory> registry = RegistryBuilder.<ConnectionSocketFactory>create()
					.register("http", new PlainConnectionSocketFactory())
					.register("https", sslFactory)
					.build();
			PoolingHttpClientConnectionManager cm = new PoolingHttpClientConnectionManager(registry);
			cm.setMaxTotal(200);
			cm.setDefaultMaxPerRoute(20);
			HttpClient httpClient = HttpClients.custom()
					.setSSLSocketFactory(sslFactory)
					.setConnectionManager(cm)
					.build();
			ClientHttpRequestFactory requestFactory = bodyOn 
					? new HttpComponentsClientHttpRequestWithBodyFactory(httpClient) //(*2)
					: new HttpComponentsClientHttpRequestFactory(httpClient); //(*1)
			
			//if(connectTimeout > 0) {
			//	requestFactory.setConnectTimeout(connectTimeout * 1000);
			//	requestFactory.setConnectionRequestTimeout(connectTimeout * 1000);
			//	requestFactory.setReadTimeout(connectTimeout * 1000);
			//}
			this.factory = requestFactory;
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private static final TrustManager[] UNQUESTIONING_TRUST_MANAGER = new TrustManager[]{
			new X509TrustManager() {
				public X509Certificate[] getAcceptedIssuers(){
					return null;
				}
				public void checkClientTrusted( X509Certificate[] certs, String authType ){}
				public void checkServerTrusted( X509Certificate[] certs, String authType ){}
			}
		};

	private static final class HttpComponentsClientHttpRequestWithBodyFactory extends HttpComponentsClientHttpRequestFactory {
		public HttpComponentsClientHttpRequestWithBodyFactory(HttpClient httpClient) {
			super(httpClient);
		}

		@Override
		protected HttpUriRequest createHttpUriRequest(HttpMethod httpMethod, URI uri) {
			if (httpMethod == HttpMethod.GET) {
				return new HttpGetRequestWithEntity(uri);
			}
			return super.createHttpUriRequest(httpMethod, uri);
		}
	}

	private static final class HttpGetRequestWithEntity extends HttpEntityEnclosingRequestBase {
		public HttpGetRequestWithEntity(final URI uri) {
			super.setURI(uri);
		}

		@Override
		public String getMethod() {
			return HttpMethod.GET.name();
		}
	}

}
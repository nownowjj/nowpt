package com.example.nowpt.cmm.rest;

import lombok.extern.slf4j.Slf4j;
import net.e4net.bfc.cmm.abnormal.BizException;
import net.e4net.bfc.cmm.model.CommonMap;
import net.e4net.bfc.cmm.util.JsonUtils;
import net.e4net.bfc.cmm.util.ObjectUtils;
import net.e4net.bfc.cmm.util.StringUtils;
import org.springframework.http.*;
import org.springframework.ui.ModelMap;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.nio.charset.Charset;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
public abstract class RestTemplateAdapterAbstract {

	protected abstract RestTemplate getRestTemplate();
	protected abstract void setRequestFactory();
	protected abstract boolean isProfilePrd();

	/* ==================================================================================
	 * 
	 */

	/**
	 * RestTemplate GET + variations
	 * @param String url : api 경로
	 * @param Map<String, Object> request : 요청 body
	 * @return ModelMap
	 */
	public ModelMap get(String apiUrl, Map<String, Object> request) {
		//get 기본형. REST API가 requestParam으로 받는 경우
		return exchangeCall(apiUrl, HttpMethod.GET, request);
	}
	public ModelMap getWithBody(String apiUrl, Map<String, Object> request) {
		//get 바디형. REST API가 requestBody으로 받는 경우. JSON으로 전달
		return exchangeWithBody(apiUrl, HttpMethod.GET, request);
	}
	public ModelMap getWithBody(String apiUrl, MultiValueMap<String, Object> request) {
		//get 바디형. REST API가 requestBody으로 받는 경우. JSON으로 전달
		return exchangeWithBody(apiUrl, HttpMethod.GET, request);
	}

	public ModelMap get(String apiUrl) {
		return get(apiUrl, null);
	}
	public ModelMap getQry(String apiUrl) {
		return exchangeCall(apiUrl, HttpMethod.GET, (Map<String,Object>)null, false);
	}
	public ModelMap getWithBody(String apiUrl) {
		return getWithBody(apiUrl, (Map<String, Object>)null);
	}

	/**
	 * RestTemplate POST + variations
	 * @param String url : api 경로
	 * @param Map<String, Object> request : 요청 body
	 * @return ModelMap
	 */
	public ModelMap post(String apiUrl, Map<String, Object> request) {
		//post 기본형
		return exchangeWithBody(apiUrl, HttpMethod.POST, request);
	}
	public ModelMap post(String apiUrl, MultiValueMap<String, Object> request) {
		//post 기본형
		return exchangeWithBody(apiUrl, HttpMethod.POST, request);
	}

	/**
	 * RestTemplate PUT + variations
	 * @param String url : api 경로
	 * @param Map<String, Object> request : 요청 body
	 * @return ModelMap
	 */
	public ModelMap put(String apiUrl, Map<String, Object> request) {
		//put 기본형
		return exchangeWithBody(apiUrl, HttpMethod.PUT, request);
	}
	public ModelMap put(String apiUrl, MultiValueMap<String, Object> request) {
		//put 기본형
		return exchangeWithBody(apiUrl, HttpMethod.PUT, request);
	}

	/**
	 * RestTemplate DELETE + variations
	 * @param String url : api 경로
	 * @param Map<String, Object> request : 요청 body
	 * @return ModelMap
	 */
	public ModelMap delete(String apiUrl, Map<String, Object> request) {
		//delete 기본형
		return exchangeCall(apiUrl, HttpMethod.DELETE, request);
	}
	public ModelMap deleteWithBody(String apiUrl, Map<String, Object> request) {
		//delete 바디형
		return exchangeWithBody(apiUrl, HttpMethod.DELETE, request);
	}
	public ModelMap deleteWithBody(String apiUrl, MultiValueMap<String, Object> request) {
		//delete 바디형
		return exchangeWithBody(apiUrl, HttpMethod.DELETE, request);
	}

	/**
	 * RestTemplate exchange helper
	 * @param String url : api 경로
	 * @param HttpMethod httpMethod : GET/POST/PUT/DELETE
	 * @param Map<String, Object> request : 요청 body
	 * @return ModelMap
	 */
	protected ModelMap exchangeCall(String apiUrl, HttpMethod httpMethod, Map<String, Object> request) {
		return exchangeCall(apiUrl, httpMethod, request, true); 
	}
	protected ModelMap exchangeCall(String apiUrl, HttpMethod httpMethod, Map<String, Object> request, boolean onJson) {
		return exchangeCallSub(apiUrl, httpMethod, convertParameter(request), onJson, null, null); 
	}

	protected ModelMap exchangeCall(String apiUrl, HttpMethod httpMethod, MultiValueMap<String, Object> request) {
		return exchangeCallSub(apiUrl, httpMethod, request, true, null, null); 
	}
	protected ModelMap exchangeCallSub(String apiUrl, HttpMethod httpMethod, MultiValueMap<String, Object> request, boolean onJson,
			String authKey, String authVal) {
		//request data 안들어온 경우
		if (request == null) {
			request = new LinkedMultiValueMap<String, Object>();
		}
		
		//인수 셋팅을 위해 Uri Builder 사용
		UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(apiUrl);
		// GET이면 쿼리 파라미터를 추가한다. 
		if (httpMethod == HttpMethod.GET) { 
			builder.queryParams(toStringMap(request));
		}

		URI uri = builder.build().encode(getCharset()).toUri();
		// RequestHeader 설정
		HttpHeaders requestHeaders = getRequestHeaders(authKey, authVal);
		//request에 대한 정보. requestBody를 사용하지 않으므로 GET의 경우 body 없이 pass
		RequestEntity<?> requestEntity;

		// GET이면 헤더만 추가한다.
		if (httpMethod == HttpMethod.GET) {
			requestEntity = new RequestEntity<>(null, requestHeaders, httpMethod, uri);
		} else {
			// 그 외에는 Body도 추가한다.
			// MediaType.APPLICATION_FORM_URLENCODED: name=value 의 형태로 쿠키, form, header, matrix, path, query등의 인수들이 나열되어 전달
			if (requestHeaders.getContentType().includes(MediaType.APPLICATION_FORM_URLENCODED)) {
				requestEntity = new RequestEntity<>(request, requestHeaders, httpMethod, uri);
				// 메시지 컨버터 설정
				//setFromMessageConverter();
			} else {
				requestEntity = new RequestEntity<>(request, requestHeaders, httpMethod, uri);
			}
		}
		return this.exchange(uri, httpMethod, requestEntity, onJson);
	}

	protected ModelMap exchangeWithBody(String apiUrl, HttpMethod httpMethod, Map<String, Object> request) {
		//request data 안들어온 경우
		if (request == null) {
			request = new HashMap<String, Object>();
		}
		return exchangeWithBodySub(apiUrl, httpMethod, request);
	}
	protected ModelMap exchangeWithBody(String apiUrl, HttpMethod httpMethod, MultiValueMap<String, Object> request) {
		//request data 안들어온 경우
		if (request == null) {
			request = new LinkedMultiValueMap<String, Object>();
		}
		return exchangeWithBodySub(apiUrl, httpMethod, request);
	}

	private ModelMap exchangeWithBodySub(String apiUrl, HttpMethod httpMethod, Object request) {
		
		//인수 셋팅을 위해 Uri Builder 사용
		UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(apiUrl);

		URI uri = builder.build().encode(getCharset()).toUri();

		// RequestHeader 설정 + media type 정의
		HttpHeaders requestHeaders = getRequestHeaders();
		requestHeaders.setContentType(MediaType.APPLICATION_JSON);
		
		// object mapper로 json을 구성. Exception 시 ""
		String json = JsonUtils.convertObjToJson(request);

		//json을 request data로 하여 requestEntity 구성
		RequestEntity<?> requestEntity = new RequestEntity<>(json, requestHeaders, httpMethod, uri);
		
		setRequestFactory();
		return this.exchange(uri, httpMethod, requestEntity, true);
	}

	/**
	 * RestTemplate exchange helper
	 * @param String uri : full uri
	 * @param HttpMethod httpMethod : GET/POST/PUT/DELETE
	 * @param HttpEntity<?> requestEntity : 요청 정보
	 * 	(*1) Charset 문제로 일단 문자열로 받는다.
	 * 	(*2) JSON으로 통일. RETURN BODY가 QueryString 형식인 경우는 QueryString 데이터를 JSON으로 변환 후 처리가 필요함. onJson = false 경우
	 * 	(*3) "trace" 경우 너무 양이 많아 최대 4행까지만 출력시키고자 한다.
	 */
	public ModelMap exchange(URI uri, HttpMethod httpMethod, HttpEntity<?> requestEntity) {
		return exchange(uri, httpMethod, requestEntity, true);
	}
	protected ModelMap exchange(URI uri, HttpMethod httpMethod, HttpEntity<?> requestEntity, boolean onJson) {
		RestTemplate restTemplate = getRestTemplate();
		ResponseEntity<String> responseEntity = null;
		try {
			responseEntity = restTemplate.exchange(uri, httpMethod, requestEntity, String.class); //(*1)
			String resBody = onJson ? responseEntity.getBody() : JsonUtils.convertQueryStringToJson(responseEntity.getBody()); //(*2)
			ModelMap response = ObjectUtils.cnvJsonToType(resBody, ModelMap.class);
			
			putApiCallLogSucccess(requestEntity, responseEntity, response);
			return response;
			
		} catch (HttpServerErrorException | HttpClientErrorException ex) {
			putApiCallLogFail(requestEntity, responseEntity, "HttpServerErrorException | HttpClientErrorException");
			// (KGC) API 결과로 동일한 상태코드로 Exception 발생 처리
			String name = ex.getClass().getSimpleName();
			CommonMap commonMap = JsonUtils.convertJsonToCommonMap(ex.getResponseBodyAsString());
			String trace = commonMap.getString("trace");
			if(trace != null && ! trace.isBlank()) {
				commonMap.set("trace", StringUtils.getLineLimit(trace, 4)); //(*3)
			}
			log.error("[API ERROR](" + name + ") error=" + ex.getMessage() + ", body=" + commonMap);
			throw new ResponseStatusException(ex.getStatusCode(), commonMap.getString("message"));
			//log.info("RESPONSE CODE [{}], RESPONSE BODY [{}]", e.getStatusCode().toString(), new String(e.getResponseBodyAsByteArray(), Charset.forName("UTF-8")));
			//throw e;
		} catch (ResourceAccessException ex) {
			putApiCallLogFail(requestEntity, responseEntity, "ResourceAccessException");
			// (KGC) 503 상태로 Exception 발생되게 처리
			String name = ex.getClass().getSimpleName();
			log.error("[GW API ERROR](" + name + ") error=" + ex.getMessage());
			throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, ex.getMessage());
			//// 타임아웃시 별도의 코드로 처리한다.
			//log.error(e.getMessage(), e);
			//throw new CaasException("91", e.getMessage(), e);
		} catch(Exception e) {
			putApiCallLogFail(requestEntity, responseEntity, "Exception");
			log.error("[RestAdapter](Exception: " + e.getClass().getSimpleName() + ") err= " + e.getMessage(), e);
			throw new BizException("99", e.getMessage(), e);
		}
	}

	/**
	 * ContentType 설정
	 * 기본은 application/x-www-form-urlencoded; charset=UTF-8
	 */
	protected MediaType getContentType() {
		return MediaType.APPLICATION_FORM_URLENCODED;
	}
	/**
	 * Accept 설정
	 * 기본은 application/json; charset=UTF-8
	 */
	protected List<MediaType> getAccept() {
//		return Arrays.asList(MediaType.APPLICATION_JSON_UTF8, MediaType.TEXT_PLAIN);
		return Collections.singletonList(MediaType.APPLICATION_JSON);
	}
	/**
	 * Charset 설정
	 * 기본은 UTF-8
	 */
	protected Charset getCharset() {
		return Charset.forName("UTF-8");
	}

	/**
	 * RequestHeaders 설정
	 */
	protected HttpHeaders getRequestHeaders() {
		return getRequestHeaders(null);
	}
	public HttpHeaders getRequestHeaders(String token) {
		return getRequestHeaders("Bearer", token);
	}
	/**
	 * 인증토큰(key, token) 포함된 API 호출 용으로 만들어 두었지만 현재 외부에서 호출 할 수 있도록 되어 있지 않음.
	 * 	향후 인증토큰 포함된 경우을 위해 만들어 둔 것 같음.
	 * 	차후 혹 사용하게 되면, 문제 될 수도 있으므로 안책임과 상의 진행하기로 함. (KGC)
	 */
	public HttpHeaders getRequestHeaders(String key, String token) {
		HttpHeaders requestHeaders = new HttpHeaders();
		requestHeaders.setContentType(getContentType());
		requestHeaders.setAccept(getAccept());
		requestHeaders.set("caas_trace_startingpoint", "WebMobile");		//2019.08.23 rest service 호출 구분자 헤더 추가
		
		if(key != null && token != null) {
			requestHeaders.set("Authorization", key + " " + token);
		}
		return requestHeaders;
	}
	
	/**
	 * map 형태의 parameter들을 multivaluemap으로 형 변환
	 * @param Map<String, Object> map
	 * @return MultiValueMap<String, Object>
	 */
	protected MultiValueMap<String, Object> convertParameter(Map<String, Object> map) {
		MultiValueMap<String, Object> multiValueMap = new LinkedMultiValueMap<>();
		if(map != null) {
			for(Map.Entry<String, Object> entry : map.entrySet()) {
				multiValueMap.add(entry.getKey(), entry.getValue());
			}
		}
		return multiValueMap;
	}
	/**
	 * GET method의 parameter가 포함된 uri build를 위해 paramter를 (string,string) 형태로 전환한다.
	 * 	(*1) 전달힐 파라미터가 배열인 경우는 개수 만큼 복수의 값을 동일한 key로 추가해 준다.
	 * @param MultiValueMap<String, Object> map
	 * @return MultiValueMap<String, Object>
	 */
	//(same)
	private MultiValueMap<String, String> toStringMap(MultiValueMap<String, Object> map) {
		MultiValueMap<String, String> multiValueMap = new LinkedMultiValueMap<>();
		for (MultiValueMap.Entry<String, List<Object>> entry : map.entrySet()) {
			for (Object value : entry.getValue()) {
				if(value != null) {
					if(value.getClass().isArray()) {
						Object[] vals = (Object[])value;
						for(int i = 0; i < vals.length; i++) { //(*1)
							multiValueMap.add(entry.getKey(), vals[i].toString());
						}
					} else {
						multiValueMap.add(entry.getKey(), value.toString());
					}
				}
			}
		}
		return multiValueMap;
	}

	/**
	 * 	"prd" 환경의 경우는 로그가 많으므로 List인 경우는 data 자체는 로그를 남기지 않기로 한다. 
	 */
	private void putApiCallLogSucccess(HttpEntity<?> requestEntity, ResponseEntity<String> responseEntity, ModelMap response) {
		log.debug("REQUEST ENTITY : [{}]", requestEntity.toString());
		if(response.get("data") instanceof List) {
			if(isProfilePrd()) {
				List<?> list = ((List<?>)response.get("data"));
				log.debug("RESPONSE ENTITY body : list= {}", list.size() );
			} else {
				putApiCallLogResponse(responseEntity, response);
			}
		} else {
			putApiCallLogResponse(responseEntity, response);
		}
	}
	private void putApiCallLogFail(HttpEntity<?> requestEntity, ResponseEntity<String> responseEntity, String mode) {
		log.debug("REQUEST ENTITY : [{}], mode= {}", requestEntity.toString(), mode);
		if(responseEntity != null) {
			log.debug("RESPONSE ENTITY : [{}]", responseEntity.toString());
		}
	}
	private void putApiCallLogResponse(ResponseEntity<String> responseEntity, ModelMap response) {
		if(isProfilePrd()) {
			log.debug("RESPONSE ENTITY body : [{}]", responseEntity.getBody().toString());
		} else {
			log.debug("RESPONSE ENTITY : [{}]", responseEntity.toString());
		}
	}

}
package com.example.nowpt.cmm.rest;

import lombok.extern.slf4j.Slf4j;
import net.e4net.bfc.cmm.abnormal.BizException;
import net.e4net.bfc.cmm.util.ObjectUtils;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.*;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.ui.ModelMap;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;

@Component
@Slf4j
public class RestProxyComponent {

	/**
	 * 
	 * @param remoteUrl
	 * @return
	 */
	public byte[] remoteGetProxyBytes(URI remoteUrl) {

		HttpComponentsClientHttpRequestFactory httpRequestFactory = new HttpComponentsClientHttpRequestFactory();
		httpRequestFactory.setConnectionRequestTimeout(360000); //6m
		httpRequestFactory.setConnectTimeout(360000); //6m
		httpRequestFactory.setReadTimeout(360000); //6m
 
		// (TODO) restTempate tobe bean
		RestTemplate restTemplate = new RestTemplate(httpRequestFactory);

		try {
			byte[] data = restTemplate.getForObject(remoteUrl, byte[].class);
			return data;
		} catch (HttpServerErrorException | HttpClientErrorException ex) {
			log.warn("[proxyFile](Exception: " + ex.getClass().getSimpleName() + ") err= " + ex.getMessage().replaceAll("\r\n|\r|\n", " "));
			// 받은 메시지 body 대로 출력 시켜 보았다. 자체 오류 페이지로 전환해도 된다.
			return null;
		} catch(Exception e) {
			log.error("[proxyFile](Exception: " + e.getClass().getSimpleName() + ") err= " + e.getMessage(), e);
			throw new BizException("99", e.getMessage(), e);
		}
	}

	public ResponseEntity<byte[]> remoteGetProxy(URI remoteUrl) {
		byte[] data = remoteGetProxyBytes(remoteUrl);
		return new ResponseEntity<>(data, HttpStatus.OK);
	}

	public ModelMap remoteSaveUploadFile(MultipartFile upload, String serverDoamin, String callUrl) {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.MULTIPART_FORM_DATA);

		MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
		try {
			MultipartInputStreamFileResource file = new MultipartInputStreamFileResource(upload.getInputStream(), upload.getOriginalFilename());
			body.add("imageFile", file);
		} catch (IOException e1) {
			throw new BizException("99", e1.getMessage(), e1);
		}

		HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
		String serverUrl = serverDoamin + callUrl;
		log.debug("serverUrl = " + serverUrl);

		RestTemplate restTemplate = new RestTemplate();
//		try {
			//ResponseEntity<String> response = restTemplate.postForEntity(serverUrl, requestEntity, String.class);
			ResponseEntity<String> responseEntity = restTemplate.exchange(serverUrl, HttpMethod.POST, requestEntity, String.class);
			log.debug("responseEntity = ", responseEntity);
			
			String resBody = responseEntity.getBody();
//			om.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);	// 다중 클래스 구조일 경우 오류 방지
//			ModelMap response = om.readValue(resBody, new TypeReference<ModelMap>(){});//new TypeReference<List<Map<String, Object>>>(){});
			ModelMap response = ObjectUtils.cnvJsonToType(resBody, ModelMap.class);
			return response;
//		} catch(Exception e) {
//			log.error("error = " + e.getMessage(), e);
//			throw new BizException("99", e.getMessage(), e);
//		}
	}

	/**
	 *	@see https://stackoverflow.com/questions/28408271/how-to-send-multipart-form-data-with-resttemplate-spring-mvc
	 */
	class MultipartInputStreamFileResource extends InputStreamResource {
		private final String filename;
		MultipartInputStreamFileResource(InputStream inputStream, String filename) {
			super(inputStream);
			this.filename = filename;
		}

		@Override
		public String getFilename() {
			return this.filename;
		}

		@Override
		public long contentLength() throws IOException {
			return -1; // we do not want to generally read the whole stream into memory ...
		}
	}

}
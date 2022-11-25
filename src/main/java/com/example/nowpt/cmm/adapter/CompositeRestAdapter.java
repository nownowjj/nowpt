package com.example.nowpt.cmm.adapter;

import com.github.miemiedev.mybatis.paginator.domain.Paginator;
import lombok.extern.slf4j.Slf4j;
import net.e4net.bfc.cmm.abnormal.BizException;
import net.e4net.bfc.cmm.util.ObjectUtils;
import net.e4net.bfc.svc.rest.AbstractCompositeRestAdapter;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.ui.ModelMap;
import org.springframework.util.MultiValueMap;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@Slf4j
public class CompositeRestAdapter extends AbstractCompositeRestAdapter {

	/* ==================================================================================
	 * 
	 */

	public boolean isSuccess(ModelMap resultMap) {
		return (boolean) resultMap.get("result");
	}

	/**
	 * REST 수신 결과 중 data 부분을 얻는다.
	 * 	(*1) "data" 결과가 map 타입이 아닌데 map type으로 읽는 개발자 실수가 있다.
	 * 		대부분은 fail 리턴하는 경우에 result = false 처리 로직을 챙기지 못하는 실책이 있을 수 있다.
	 * @param resultMap REST 수신 결과
	 * @return data 부분
	 */
	public Map<String, Object> getData(ModelMap resultMap) {
		try {
			@SuppressWarnings("unchecked")
			Map<String, Object> data = (Map<String, Object>)resultMap.get("data");
			return data;
		} catch(ClassCastException e) { //(*1)
			log.error("[ERROR] casting 오류. not map type. date = " + resultMap.get("data").toString());
			throw new BizException("실패했습니다.");
		}
	}

	public List<Map<String, Object>> getDataAsList(ModelMap resultMap) {
		@SuppressWarnings("unchecked")
		List<Map<String, Object>> data = (List<Map<String, Object>>)resultMap.get("data");
		return data;
	}

	public Paginator getDataPaginator(ModelMap resultMap) {
		Paginator paginator = ObjectUtils.cnvMapToType(resultMap.get("paginator"), Paginator.class);
		return paginator;
	}

	/**
	 * REST 수신 결과 중 data 부분을 원하는 Class Type으로 얻는 경우에 사용.
	 * @param resultMap REST 수신 결과
	 * @param type 리턴 Class 타입
	 * @return type으로 cast된 data 부분
	 */
	public <T>T getDataType(ModelMap resultMap, Class<T> type) {
		return ObjectUtils.cnvMapToType(getData(resultMap), type);
	}

	/**
	 * REST 수신 결과 중 data 부분을 원하는 List<Class Type>으로 얻는 경우에 사용.
	 * @param resultMap REST 수신 결과
	 * @param type 리턴 Class 타입
	 * @return type으로 cast된 data 부분
	 */
	public <T> List<T> getDataTypeList(ModelMap resultMap, Class<T> type){
		return getDataAsList(resultMap).stream().map(a -> ObjectUtils.cnvMapToType(a, type)).collect(Collectors.toList());
	}

	/**
	 * Oauth 인증 API 호출 시 사용한다.
	 */
	public ModelMap postAuth(String clientId, String clientSecret, String serviceUrl, String url, MultiValueMap<String, Object> request) {
		log.debug("[postAuth] clientId= {}, serviceUrl= {}, url= {}", clientId, serviceUrl, url );
		String clientCredentials = clientId + ":" + clientSecret;
		String base64client = new String(Base64.encodeBase64(clientCredentials.getBytes()));
		ModelMap response = exchangeCallSub(serviceUrl + url, HttpMethod.POST, request, true, "Basic", base64client);
		return response;
	}

}
package com.example.nowpt.cmm.adapter;

import com.example.nowpt.cmm.rest.AbstractCompositeRestAdapter;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

// (KGC) blockchain에서 사용했었는데 현재 사용하지 않고 있다.
//		차후 정리하든지 아니면 다시 사용하든지 한다.
@Component
@Deprecated
public class CompositeTokenRestAdapter extends AbstractCompositeRestAdapter {

	// (TODO) private 변수 안되게 처리.
	private String tokenKey = null;
	private String tokenVal = null;

	@Deprecated
	public String getToken() {
		return tokenVal;
	}

	@Deprecated
	public void setToken(String token) {
		this.tokenVal = token;
	}

	@Deprecated
	public void setTokenKey(String tokenKey) {
		this.tokenKey = tokenKey;
	}

	@Override
	public HttpHeaders getRequestHeaders() {
		return tokenKey == null ? super.getRequestHeaders(tokenVal) : super.getRequestHeaders(tokenKey, tokenVal);
	}

}

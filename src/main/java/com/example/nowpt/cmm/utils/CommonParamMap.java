package com.example.nowpt.cmm.utils;

import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import javax.servlet.http.HttpServletRequest;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.Enumeration;
import java.util.List;
import java.util.Map;

public class CommonParamMap
{
    private CommonMap map = new CommonMap();

    public CommonMap getMap() {
        return map;
    }

    public Object put(String key, Object val) {
        return map.set(key, val);
    }

    public Object set(String key, Object val) {
        return map.set(key, val);
    }

    public Object get(String key) {
        return map.get(key);
    }

    public boolean isNotEmpty(String key) {
        return map.isNotEmpty(key);
    }
    public boolean isEmpty(String key) {
        return map.isEmpty(key);
    }

    /* ==================================================================================
     * get MultiValueMap
     */

    /**
     * 파라미터 맵이 MultiValueMap 넘어 오는 경우 MultiValueMap 타입으로 넘겨준다.
     * @return
     */
    public MultiValueMap<String, Object> getMultiValueMap() {
        @SuppressWarnings({ "rawtypes", "unchecked" })
        MultiValueMap<String, Object> params = new LinkedMultiValueMap(map);
        return params;
    }

    /* ==================================================================================
     * get List
     */
    public List<Object> getList(String key) {
        return map.getList(key);
    }

    @SuppressWarnings("deprecation")
    public List<?> getLis(String key) {
        return map.getLis(key);
    }

    public List<String> getListString(String key) {
        return map.getListString(key);
    }

    public List<CommonMap> getListMap(String key) {
        return map.getListMap(key);
    }

    /* ==================================================================================
     * get 문자열
     */

    /**
     * 문자열로 얻는다.
     * @param key
     * @param intVal null인 경우에 default 리턴 값
     * @return
     */
    public String getString(String key, String intVal) {
        return map.getString(key, intVal);
    }

    /**
     * 문자열로 얻는다.
     * @param key
     * @param intVal null이거나 공백인 경우에 default 리턴 값
     * @return
     */
    public String getStringEmpty(String key, String intVal) {
        return map.getStringEmpty(key, intVal);
    }

    /**
     * 문자열을 얻는다. null인 경우에 공백으로 리턴한다.
     * @param key
     * @return
     */
    public String getStringEmpty(String key) {
        return map.getStringEmpty(key);
    }

    /**
     * 문자열을 얻는다.
     * @param key
     * @return 키가 없는 경우 null
     */
    public String getString(String key) {
        return map.getString(key);
    }

    /* ==================================================================================
     * get 정수
     */

    /**
     * Integer 리턴
     * @param key
     * @param intVal null인 경우에 default 리턴 값
     * @return
     */
    public Integer getInt(String key, Integer intVal) {
        return map.getInt(key, intVal);
    }

    /**
     * Integer 리턴
     * @param key
     * @return
     */
    public Integer getInt(String key) {
        return map.getInt(key);
    }

    /**
     * Integer 리턴. null 인 경우에 0으로 리턴
     * @param key
     * @return
     */
    public Integer getIntZero(String key) {
        return map.getInt(key);
    }

    /* ==================================================================================
     * get long 정수
     */

    /**
     * Long 리턴
     * @param key
     * @param intVal null인 경우에 default 리턴 값
     * @return
     */
    public Long getLong(String key, Long intVal) {
        return map.getLong(key, intVal);
    }

    /**
     * Long 리턴
     * @param key
     * @return
     */
    public Long getLong(String key) {
        return map.getLong(key);
    }

    /**
     * Long 리턴. null 인 경우에 0으로 리턴
     * @param key
     * @return
     */
    public Long getLongZero(String key) {
        return map.getLongZero(key);
    }

    /* ==================================================================================
     * get Double
     */

    /**
     * Double 리턴
     * @param key
     * @param intVal null인 경우에 default 리턴 값
     * @return
     */
    public Double getDouble(String key, Double intVal) {
        return map.getDouble(key, intVal);
    }

    /**
     * Double 리턴
     * @param key
     * @return
     */
    public Double getDouble(String key) {
        return map.getDouble(key);
    }

    /**
     * Double 리턴. null 인 경우에 0으로 리턴
     * @param key
     * @return
     */
    public Double getDoubleZero(String key) {
        return map.getDouble(key);
    }

    /* ==================================================================================
     * get Boolean
     */

    /**
     * Boolean 리턴
     * @param key
     * @param intVal null인 경우에 default 리턴 값
     * @return
     */
    public Boolean getBoolean(String key, Boolean intVal) {
        return map.getBoolean(key, intVal);
    }

    /**
     * Boolean 리턴
     * @param key
     * @return
     */
    public Boolean getBoolean(String key) {
        return map.getBoolean(key);
    }

    /**
     * Double 리턴. null 인 경우에 false로 리턴
     * @param key
     * @return
     */
    public Boolean getBooleanFalse(String key) {
        return map.getBoolean(key);
    }

    /* ==================================================================================
     * get Timestamp
     */

    /**
     * Timestamp 리턴
     * @param key
     * @param intVal null인 경우에 default 리턴 값
     * @return
     */
    public Timestamp getTimestamp(String key, Timestamp intVal) {
        return map.getTimestamp(key, intVal);
    }

    /**
     * Timestamp 리턴
     * @param key
     * @return
     */
    public Timestamp getTimestamp(String key) {
        return map.getTimestamp(key);
    }

    /**
     * Timestamp 리턴. null 인 경우에 Now로 리턴
     * @param key
     * @return
     */
    public Timestamp getTimestampNow(String key) {
        return map.getTimestampNow(key);
    }

    /* ==================================================================================
     * get Date
     */

    /**
     * Date 리턴
     * @param key
     * @param intVal null인 경우에 default 리턴 값
     * @return
     */
    public Date getDate(String key, Date intVal) {
        return map.getDate(key, intVal);
    }

    /**
     * Date 리턴
     * @param key
     * @return
     */
    public Date getDate(String key) {
        return map.getDate(key);
    }

    /**
     * Date 리턴. null 인 경우에 Now로 리턴
     * @param key
     * @return
     */
    public Date getDateNow(String key) {
        return map.getDateNow(key);
    }

    /**
     * HTTP Request로 받는 Parameters를 CommonMap에 set한다.
     * @param request
     * @return
     */
    public void putRequestParam(HttpServletRequest request)
    {
        Enumeration<?> enumeration = request.getParameterNames();
        while(enumeration.hasMoreElements()) {
            String key = (String) enumeration.nextElement();
            String[] values = request.getParameterValues(key);
            //if(values != null && values.length > 0 && ! values[0].isEmpty()) {
            if(values != null) {
                map.set(key, values.length > 1 ? values : values[0]);
//				if(values.length == 1) {
//					map.set(key, values[0]);
//				} else {
//					map.set(key, Arrays.copyOf(values, values.length));
//				}
            }
        }
    }

    /**
     * 맵을 맵에 추가한다.
     * @param param
     */
    public void putRequestParam(CommonMap param) {
        map.putAll(param);
    }

    public void putRequestParam(Map<String, Object> param) {
        for(String key : param.keySet()) {
            map.set(key, param.get(key));
        }
    }

    @Override
    public String toString() {
        return map.toString();
    }

    public CommonParamMap with(String key, Object value) {
        put(key, value);
        return this;
    }

    public static CommonParamMap newMap(String key, Object value) {
        return new CommonParamMap().with(key, value);
    }

//	public static void test() {
//		CommonMap map2 = CommonMap.newMap("kgc", 1234).with("qwe", "dkdfk");
//		CommonMap map3 = new CommonMap().with("kgc", 1234).with("qwe", "dkdfk");
//	}

}

package com.example.nowpt.cmm.utils;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;
import java.util.Map;
import org.apache.commons.collections4.map.ListOrderedMap;
import org.springframework.ui.ModelMap;


import com.example.nowpt.cmm.utils.CastUtils;
/**
 * 만능 공통 맵
 * 	기본적으로 key를 camelcase로 만든다. put()의 경우는 camelcase화 한다.
 * 	key변경을 하지 않는 경우는 set을 사용한다.
 * @author KC.KIM
 */
@SuppressWarnings("serial")
public class CommonMap extends ListOrderedMap<String, Object>

{
    /**
     * 키를 CamelCase로 해서 값을 저장
     * @param key 키
     * @param val 값
     * @return
     */
    @Override
    public Object put(String key, Object val) {
        return super.put(toCamelCase(key), val);
    }

    public Object putInt(String key, Object val) {
        return super.put(toCamelCase(key), val == null ? 0 : Integer.parseInt(val.toString()));
    }
    public Object putLong(String key, Object val) {
        return super.put(toCamelCase(key), val == null ? 0L : Long.parseLong(val.toString()));
    }

    public boolean isNotEmpty(String key) {
        return super.get(key) != null && ! super.get(key).toString().isEmpty();
    }
    public boolean isEmpty(String key) {
        return ! isNotEmpty(key);
    }
    @Deprecated
    public boolean check(String key) {
        return isNotEmpty(key);
    }

    /**
     * 키를 CamelCase로 변환하지 않고 그대로 해서 값을 저장
     * @param key 키
     * @param val 값
     * @return
     */
    public Object set(String key, Object val) {
        return super.put(key, val);
    }
    public Object putOrg(String key, Object val) {
        return super.put(key, val);
    }
    public Object putOrgInt(String key, Object val) {
        return super.put(key, val == null ? 0 : val instanceof Integer ? val : Integer.parseInt(val.toString()));
    }
    public Object putOrgLong(String key, Object val) {
        return super.put(key, val == null ? 0L : val instanceof Long ? val : Long.parseLong(val.toString()));
    }

    /* ==================================================================================
     * get List
     */
    @SuppressWarnings("unchecked")
    public List<Object> getList(String key) {
        return (List<Object>)get(key);
    }

    @Deprecated
    public List<?> getLis(String key) {
        return (List<?>)get(key);
    }

    @SuppressWarnings("unchecked")
    public List<String> getListString(String key) {
        return (List<String>)get(key);
    }

    @SuppressWarnings("unchecked")
    public List<CommonMap> getListMap(String key) {
        return (List<CommonMap>)get(key);
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
        return CastUtils.castString(super.get(key), intVal);
    }

    /**
     * 문자열로 얻는다.
     * @param key
     * @param intVal null이거나 공백인 경우에 default 리턴 값
     * @return
     */
    public String getStringEmpty(String key, String intVal) {
        String val = getString(key, intVal);
        return val.isEmpty() ? intVal : val;
    }

    /**
     * 문자열을 얻는다. null인 경우에 공백으로 리턴한다.
     * @param key
     * @return
     */
    public String getStringEmpty(String key) {
        return getStringEmpty(key, "");
    }

    /**
     * 문자열을 얻는다.
     * @param key
     * @return 키가 없는 경우 null
     */
    public String getString(String key) {
        return getString(key, null);
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
        return CastUtils.castInt(super.get(key), intVal);
    }

    /**
     * Integer 리턴
     * @param key
     * @return
     */
    public Integer getInt(String key) {
        return getInt(key, null);
    }

    /**
     * Integer 리턴. null 인 경우에 0으로 리턴
     * @param key
     * @return
     */
    public Integer getIntZero(String key) {
        return getInt(key, 0);
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
        return CastUtils.castLong(super.get(key), intVal);
    }

    /**
     * Long 리턴
     * @param key
     * @return
     */
    public Long getLong(String key) {
        return getLong(key, 0L);
    }

    /**
     * Long 리턴. null 인 경우에 0으로 리턴
     * @param key
     * @return
     */
    public Long getLongZero(String key) {
        return getLong(key, 0L);
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
        return CastUtils.castDouble(super.get(key), intVal);
    }

    /**
     * Double 리턴
     * @param key
     * @return
     */
    public Double getDouble(String key) {
        return getDouble(key, null);
    }

    /**
     * Double 리턴. null 인 경우에 0으로 리턴
     * @param key
     * @return
     */
    public Double getDoubleZero(String key) {
        return getDouble(key, 0.0);
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
        return CastUtils.castBoolean(super.get(key), intVal);
    }

    /**
     * Boolean 리턴
     * @param key
     * @return
     */
    public Boolean getBoolean(String key) {
        return getBoolean(key, null);
    }

    /**
     * Boolean 리턴. null 인 경우에 false로 리턴
     * @param key
     * @return
     */
    public Boolean getBooleanFalse(String key) {
        return getBoolean(key, false);
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
        return CastUtils.castTimestamp(super.get(key), intVal);
    }

    /**
     * Timestamp 리턴
     * @param key
     * @return
     */
    public Timestamp getTimestamp(String key) {
        return getTimestamp(key, null);
    }

    /**
     * Timestamp 리턴. null 인 경우에 Now로 리턴
     * @param key
     * @return
     */
    public Timestamp getTimestampNow(String key) {
        return getTimestamp(key, new Timestamp(System.currentTimeMillis()));
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
        return CastUtils.castDate(super.get(key), intVal);
    }

    /**
     * Date 리턴
     * @param key
     * @return
     */
    public Date getDate(String key) {
        return getDate(key, null);
    }

    /**
     * Date 리턴. null 인 경우에 Now로 리턴
     * @param key
     * @return
     */
    public Date getDateNow(String key) {
        return getDate(key, new Date(System.currentTimeMillis()));
    }

    /* ==================================================================================
     * 특수. DB에서 공통 표준으로 사용되는 getter
     *	writeId, writeSq : insert/update 시 등록자로 사용. 미지정시는 "system", 0L 으로 리턴
     *	userId, userSq : 본인 것만 조회하는 조건에 사용
     *	groupSq : 단체(그룹) 조건에 사용. 해당 그룹만 조회되게 하는 경우에 사용
     */

    /* ==================================================================================
     * 기타
     */

    /**
     * Map 리턴.
     * @param key
     * @return
     */
    @SuppressWarnings("unchecked")
    public Map<String, Object> getMap(String key) {
        Object val = super.get(key);
        if(val == null) return null;
        return (Map<String, Object>)val;
    }

    /**
     * Map 리턴.
     * @param key
     * @return Map<String, Object>
     * @TODO
     */
    public CommonMap getCommonMap(String key) {
        Object val = super.get(key);
        if(val == null) return null;
        return (CommonMap)val;
    }


    /**
     * CommonMap으로 변환하여 return
     */
    public static final CommonMap toCommonMap(ModelMap param) {
        CommonMap converted = new CommonMap();
        converted.putAll(param);
        return converted;
    }
    public static final CommonMap toCommonMap(Map<String, Object> param) {
        CommonMap converted = new CommonMap();
        converted.putAll(param);
        return converted;
    }

    /**
     * Underline 문자열을 CamelCase 문자열로 변환
     * @param str
     * @return
     */
    private String toCamelCase(String s) {
        String[] parts = s.split("_");

        if(parts.length == 1) {
            return s;
        }

        StringBuilder result = new StringBuilder();
        for(int i = 0; i < parts.length ; i++) {
            String sp = parts[i];
            String rtnValue = i != 0
                    ? sp.substring(0, 1).toUpperCase() + sp.substring(1).toLowerCase()
                    : sp.toLowerCase();
            result.append(rtnValue);
        }
        return result.toString();
    }

    /**
     * 복수의 값을 push 시키는 심플한 방법을 제공
     * usage: CommonMap map1 = CommonMap.newMap("key1", 1234).with("key2", "test");
     * 		CommonMap map2 = new CommonMap().with("key1", 1234).with("key2", "test");
     */
    public CommonMap with(String key, Object value) {
        put(key, value);
        return this;
    }

    public static CommonMap newMap(String key, Object value) {
        return new CommonMap().with(key, value);
    }

//	public static void test() {
//		CommonMap map1 = new CommonMap() {{
//			put("a", "1");
//			put("b", "2");
//		}};
//		map1.with("fff", "xxx");
//
//		CommonMap map2 = CommonMap.newMap("kgc", 1234).with("qwe", "dkdfk");
//		CommonMap map3 = new CommonMap().with("kgc", 1234).with("qwe", "dkdfk");
//	}
}
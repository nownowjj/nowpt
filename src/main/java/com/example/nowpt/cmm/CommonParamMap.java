package com.example.nowpt.cmm;

import org.springframework.util.MultiValueMap;

import javax.servlet.http.HttpServletRequest;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

public class CommonParamMap {
    private CommonMap map = new CommonMap();

    public CommonParamMap() {
    }

    public CommonMap getMap() {
        return this.map;
    }

    public Object put(String key, Object val) {
        return this.map.set(key, val);
    }

    public Object set(String key, Object val) {
        return this.map.set(key, val);
    }

    public Object get(String var1) {
        throw new Error("Unresolved compilation problem: \n\tThe method get(String) is undefined for the type CommonMap\n");
    }

    public boolean check(String key) {
        return this.map.check(key);
    }

    public MultiValueMap<String, Object> getMultiValueMap() {
        throw new Error("Unresolved compilation problems: \n\tMultiValueMap cannot be resolved to a type\n\tMultiValueMap cannot be resolved to a type\n\tLinkedMultiValueMap cannot be resolved to a type\n");
    }

    public List<Object> getList(String key) {
        return this.map.getList(key);
    }

    public List<CommonMap> getListMap(String key) {
        return this.map.getListMap(key);
    }

    public String getString(String key, String intVal) {
        return this.map.getString(key, intVal);
    }

    public String getStringEmpty(String key, String intVal) {
        return this.map.getStringEmpty(key, intVal);
    }

    public String getStringEmpty(String key) {
        return this.map.getStringEmpty(key);
    }

    public String getString(String key) {
        return this.map.getString(key);
    }

    public Integer getInt(String key, Integer intVal) {
        return this.map.getInt(key, intVal);
    }

    public Integer getInt(String key) {
        return this.map.getInt(key);
    }

    public Integer getIntZero(String key) {
        return this.map.getInt(key);
    }

    public Long getLong(String key, Long intVal) {
        return this.map.getLong(key, intVal);
    }

    public Long getLong(String key) {
        return this.map.getLong(key);
    }

    public Long getLongZero(String key) {
        return this.map.getLongZero(key);
    }

    public Double getDouble(String key, Double intVal) {
        return this.map.getDouble(key, intVal);
    }

    public Double getDouble(String key) {
        return this.map.getDouble(key);
    }

    public Double getDoubleZero(String key) {
        return this.map.getDouble(key);
    }

    public Boolean getBoolean(String key, Boolean intVal) {
        return this.map.getBoolean(key, intVal);
    }

    public Boolean getBoolean(String key) {
        return this.map.getBoolean(key);
    }

    public Boolean getBooleanFalse(String key) {
        return this.map.getBoolean(key);
    }

    public Timestamp getTimestamp(String key, Timestamp intVal) {
        return this.map.getTimestamp(key, intVal);
    }

    public Timestamp getTimestamp(String key) {
        return this.map.getTimestamp(key);
    }

    public Timestamp getTimestampNow(String key) {
        return this.map.getTimestampNow(key);
    }

    public Date getDate(String key, Date intVal) {
        return this.map.getDate(key, intVal);
    }

    public Date getDate(String key) {
        return this.map.getDate(key);
    }

    public Date getDateNow(String key) {
        return this.map.getDateNow(key);
    }

    public void putRequestParam(HttpServletRequest var1) {
        throw new Error("Unresolved compilation problem: \n\tHttpServletRequest cannot be resolved to a type\n");
    }

    public void putRequestParam(CommonMap var1) {
        throw new Error("Unresolved compilation problem: \n\tThe method putAll(CommonMap) is undefined for the type CommonMap\n");
    }

    public void putRequestParam(Map<String, Object> param) {
        Iterator var3 = param.keySet().iterator();

        while(var3.hasNext()) {
            String key = (String)var3.next();
            this.map.set(key, param.get(key));
        }

    }

    public String toString() {
        return this.map.toString();
    }
}

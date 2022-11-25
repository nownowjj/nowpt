package com.example.nowpt.cmm.utils;

import java.math.BigDecimal;
import java.sql.Date;
import java.sql.Timestamp;

/**
 * 표준 타입 Casting 처리 모듈
 * @author E4-N282
 *
 */
public class CastUtils {

	public static final String castString(Object val, String intVal) {
		return val == null ? intVal : val.toString().trim();
	}

	public static final Integer castInt(Object val, Integer intVal) {
		if(val == null) return intVal;
		if(val instanceof Long || val instanceof Integer || val instanceof Double) {
			return (Integer)val;
		}
		return Integer.parseInt(String.valueOf(val));
	}

	@SuppressWarnings("deprecation")
	public static final Long castLong(Object val, Long intVal) {
		if(val == null || val == "") return intVal;
		if(val instanceof Long || val instanceof Double) {
			return (Long)val;
		}
		if(val instanceof Integer) {
			return new Long((Integer) val);
		}
		return Long.parseLong(String.valueOf(val));
	}

	@SuppressWarnings("deprecation")
	public static final Double castDouble(Object val, Double intVal) {
		if(val == null) return intVal;
		if(val instanceof Long || val instanceof Double) {
			return (Double)val;
		}
		if(val instanceof Integer) {
			return new Double((Integer) val);
		}
		if(val instanceof BigDecimal) {
			return ((BigDecimal) val).doubleValue();
		}
		return Double.parseDouble((String)val);
	}

	public static final Boolean castBoolean(Object val, Boolean intVal) {
		if(val == null) return intVal;
		if(val instanceof Boolean) {
			return (Boolean)val;
		};
		return Boolean.parseBoolean((String)val);
	}

	public static final Timestamp castTimestamp(Object val, Timestamp intVal) {
		if(val == null) return intVal;
		if(val instanceof Timestamp) {
			return (Timestamp)val;
		};
		return Timestamp.valueOf(val.toString());
	}

	public static final Date castDate(Object val, Date intVal) {
		if(val == null) return intVal;
		if(val instanceof Date) {
			return (Date)val;
		};
		return Date.valueOf(val.toString());
	}

}

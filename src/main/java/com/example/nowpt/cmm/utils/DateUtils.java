package com.example.nowpt.cmm.utils;

import lombok.extern.slf4j.Slf4j;

import java.text.SimpleDateFormat;
import java.util.Date;

@Slf4j
public class DateUtils {

    public static String FMT_YtoD = "yyyy-MM-dd";
    public static String FMT_YtoS = "yyyy-MM-dd HH:mm:ss";
    public static String FMT_YMD = "yyyyMMdd";
    public static String FMT_YM = "yyyyMM";
    public static String FMT_D_YMD = "yy.MM.dd";




    public static String getTodayFmt(String fmt) {
        SimpleDateFormat format = new SimpleDateFormat(fmt);
        Date time = new Date();
        return format.format(time);
    }

    public static String getTodayYmd() {
        return getTodayFmt(FMT_YMD);
    }


}

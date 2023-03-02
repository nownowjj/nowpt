//package com.example.nowpt.mvc.weather;
//
//import java.io.BufferedReader;
//import java.io.BufferedWriter;
//import java.io.InputStreamReader;
//import java.io.OutputStreamWriter;
//import java.net.HttpURLConnection;
//import java.net.URL;
//import java.time.LocalDate;
//import java.time.format.DateTimeFormatter;
//import java.util.HashMap;
//
//import lombok.extern.slf4j.Slf4j;
//import org.json.JSONObject;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//
//@RestController
//@Slf4j
//@RequestMapping("/api/auth")
//public class WeatherApiController {
//
//    @GetMapping("/weather")
//    public String restApiGetWeather() throws Exception {
//
//        // 현재 날짜 구하기
//        LocalDate now = LocalDate.now();
//
//        LocalDate twoDaysAgo = now.minusDays(1); // 2일 전
//
//        now = twoDaysAgo;
//
//        // 포맷 정의
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
//        // 포맷 적용
//        String formatedNow = now.format(formatter);
//        log.debug("조건 날짜 : {}" ,formatedNow);
//        /*
//            @ API LIST ~
//
//            getUltraSrtNcst 초단기실황조회
//            getUltraSrtFcst 초단기예보조회
//            getVilageFcst 동네예보조회
//            getFcstVersion 예보버전조회
//        */
//        String url = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst"
//                + "?serviceKey=C1dyxQ8J4rsqoxWObuS8zyvOOxuJB2iBmxSs9Q58iZed0ubWowzekp%2B%2FxQa194cEvlhLqqNCziGOyYHYEw9N9g%3D%3D"
//                + "&dataType=JSON"            // JSON, XML
//                + "&numOfRows=10"             // 페이지 ROWS
//                + "&pageNo=1"                 // 페이지 번호
//                + "&base_date="+formatedNow   // 발표일자
//                + "&base_time=0800"           // 발표시각
//                + "&nx=60"                    // 예보지점 X 좌표
//                + "&ny=127";                  // 예보지점 Y 좌표
//
////        T1H : 기온(℃)
////        RN1 : 1시간 강수량(범주(1 mm))
////        SKY : 하늘상태(코드값)
////        UUU : 동서바람성분(m/s)
////        VVV : 남북바람성분(m/s)
////        REH : 습도(%)
////        PTY : 강수형태(코드값)
////        LGT : 낙뢰(코드값)
////        VEC : 풍향(deg)
////        WSD : 풍속(m/s)
//
//        HashMap<String, Object> resultMap = getDataFromJson(url, "UTF-8", "get", "");
//
//        System.out.println("# RESULT : " + resultMap);
//
//        JSONObject jsonObj = new JSONObject();
//
//        jsonObj.put("result", resultMap);
//
//        return jsonObj.toString();
//    }
//
//    public HashMap<String, Object> getDataFromJson(String url, String encoding, String type, String jsonStr) throws Exception {
//        boolean isPost = false;
//
//        if ("post".equals(type)) {
//            isPost = true;
//        } else {
//            url = "".equals(jsonStr) ? url : url + "?request=" + jsonStr;
//        }
//
//        return getStringFromURL(url, encoding, isPost, jsonStr, "application/json");
//    }
//
//    public HashMap<String, Object> getStringFromURL(String url, String encoding, boolean isPost, String parameter, String contentType) throws Exception {
//        URL apiURL = new URL(url);
//
//        HttpURLConnection conn = null;
//        BufferedReader br = null;
//        BufferedWriter bw = null;
//
//        HashMap<String, Object> resultMap = new HashMap<String, Object>();
//
//        try {
//            conn = (HttpURLConnection) apiURL.openConnection();
//            conn.setConnectTimeout(10000);
//            conn.setReadTimeout(20000);
//            conn.setDoOutput(true);
//
//            if (isPost) {
//                conn.setRequestMethod("POST");
//                conn.setRequestProperty("Content-Type", contentType);
//                conn.setRequestProperty("Accept", "*/*");
//            } else {
//                conn.setRequestMethod("GET");
//            }
//
//            conn.connect();
//
//            if (isPost) {
//                bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream(), "UTF-8"));
//                bw.write(parameter);
//                bw.flush();
//                bw = null;
//            }
//
//            br = new BufferedReader(new InputStreamReader(conn.getInputStream(), encoding));
//
//            String line = null;
//
//            StringBuffer result = new StringBuffer();
//
//            while ((line=br.readLine()) != null) result.append(line);
//
//            ObjectMapper mapper = new ObjectMapper();
//
//            resultMap = mapper.readValue(result.toString(), HashMap.class);
//        } catch (Exception e) {
//            e.printStackTrace();
//            throw new Exception(url + " interface failed" + e.toString());
//        } finally {
//            if (conn != null) conn.disconnect();
//            if (br != null) br.close();
//            if (bw != null) bw.close();
//        }
//
//        return resultMap;
//    }
//}
package com.example.nowpt.mvc.openApi.weather;

import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import javax.xml.parsers.DocumentBuilderFactory;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

/**
 *  @TODO 기상청 x,y 좌표로 위경도 변환
 */
@RestController
@Slf4j
@RequestMapping("/api/auth")
public class WeaherApiController2 {
    @Value("${weather.api-key}") private String KEY;

    @GetMapping("/weather2")
    public HashMap<String, String> main(String[] args) {
        HashMap<String, String> result = new HashMap<>();
        String[] v = new String[5];
        String s = get(58, 125, v); // 서울시 금천구 가산동


        if (s == null) { // ok!
            result.put("date",v[0]); // 날짜
            result.put("time",v[1]); // 시간
            result.put("weather",v[2]); // 날씨
            result.put("temperature ",v[3]); //기온
            result.put("humidity",v[4]); //습도
        } else { // error
            result.put("error",s);
        }
        return result;
    }

    // [in] x, y : 예보지점 X, Y 좌표
    //=> 행정구역별 x,y 값은 참고문서(https://www.data.go.kr/data/15084084/openapi.do) 내려받아 확인
    // [out] v[0]=예보날짜(yyyyMMdd), v[1]=예보시간(HHmm), v[2]=날씨, v[3]=기온(℃), v[4]=습도(%)
    // 반환값 : 에러메시지, null == OK
    public String get(int x, int y, String[] v) {
        HttpURLConnection con = null;
        String s = null; // 에러 메시지

        try {
            LocalDateTime t = LocalDateTime.now().minusMinutes(30); // 현재 시각 30분전

            URL url = new URL(
                    "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst"
                            + "?ServiceKey=" + KEY // 서비스키
                            //	+ "&pageNo=1" // 페이지번호 Default: 1
                            + "&numOfRows=60" // 한 페이지 결과 수 (10개 카테고리값 * 6시간)
                            //	+ "&dataType=XML" // 요청자료형식(XML/JSON) Default: XML
                            + "&base_date=" + t.format(DateTimeFormatter.ofPattern("yyyyMMdd"))  // 발표 날짜
                            + "&base_time=" + t.format(DateTimeFormatter.ofPattern("HHmm")) // 발표 시각
                            + "&nx=" + x // 예보지점의 X 좌표값
                            + "&ny=" + y // 예보지점의 Y 좌표값
            );

            con = (HttpURLConnection) url.openConnection();
            Document doc = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(con.getInputStream());

            boolean ok = false; // <resultCode>00</resultCode> 획득 여부

            Element e;
            NodeList ns = doc.getElementsByTagName("header");
            if (ns.getLength() > 0) {
                e = (Element) ns.item(0);
                if ("00".equals(e.getElementsByTagName("resultCode").item(0).getTextContent()))
                    ok = true; // 성공 여부
                else // 에러 메시지
                    s = e.getElementsByTagName("resultMsg").item(0).getTextContent();
            }

            if (ok) {
                String fd = null, ft = null; // 가장 빠른 예보 시각
                String pty = null; // 강수형태
                String sky = null; // 하늘상태
                String cat; // category
                String val; // fcstValues

                ns = doc.getElementsByTagName("item");
                for (int i = 0; i < ns.getLength(); i++) {
                    e = (Element) ns.item(i);

                    if (ft == null) { // 가져올 예보 시간 결정
                        fd = e.getElementsByTagName("fcstDate").item(0).getTextContent(); // 예보 날짜
                        ft = e.getElementsByTagName("fcstTime").item(0).getTextContent(); // 예보 시각
                    } else if (!fd.equals(e.getElementsByTagName("fcstDate").item(0).getTextContent()) ||
                            !ft.equals(e.getElementsByTagName("fcstTime").item(0).getTextContent()))
                        continue; // 결정된 예보 시각과 같은 시각의 것만 취한다.

                    cat = e.getElementsByTagName("category").item(0).getTextContent(); // 자료구분코드
                    val = e.getElementsByTagName("fcstValue").item(0).getTextContent(); // 예보 값

                    if ("PTY".equals(cat)) pty = val; // 강수형태
                    else if ("SKY".equals(cat)) sky = val; // 하늘상태
                    else if ("T1H".equals(cat)) v[3] = val; // 기온
                    else if ("REH".equals(cat)) v[4] = val; // 습도
                }

                v[0] = fd;
                v[1] = ft;

                if ("0".equals(pty)) { // 강수형태 없으면, 하늘상태로 판단
                    if ("1".equals(sky)) v[2] = "맑음";
                    else if ("3".equals(sky)) v[2] = "구름많음";
                    else if ("4".equals(sky)) v[2] = "흐림";
                } else if ("1".equals(pty)) v[2] = "비";
                else if ("2".equals(pty)) v[2] = "비/눈";
                else if ("3".equals(pty)) v[2] = "눈";
                else if ("5".equals(pty)) v[2] = "빗방울";
                else if ("6".equals(pty)) v[2] = "빗방울눈날림";
                else if ("7".equals(pty)) v[2] = "눈날림";
            }
        } catch (Exception e) {
            s = e.getMessage();
        }

        if (con != null)
            con.disconnect();

        return s;
    }
}


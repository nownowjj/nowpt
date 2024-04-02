package com.example.nowpt.mvc.controller;

import com.vane.badwordfiltering.BadWordFiltering;
import lombok.extern.slf4j.Slf4j;

@Slf4j
/**
 * https://github.com/VaneProject/bad-word-filtering
 */
public class BadWordTest {

//    설명: 라이브러리에서 지원하는 단어중에 원하는 단어가 없을 경우 해당 메소드를 사용하여 추가할 수 있습니다.
//     badWordFiltering.add(String[]);
//     badWordFiltering.add(List<String>);
//     badWordFiltering.add(Set<String>);

//설명: 라이브러리에서 지원하는 단어 중 필터링이 되면 안돼는 단어가 있을 경우 해당 메소드를 사용하여 필터링 단어에서 제거 하실 수 있습니다.
//      badWordFiltering.remove(String[]);
//      badWordFiltering.remove(List<String>);
//      badWordFiltering.remove(Set<String>);

    public static void test(){
        BadWordFiltering badWordFiltering = new BadWordFiltering();

        boolean filterWord = badWordFiltering.check("ㅆㅂ");
        if (filterWord) {
            log.debug("엥 : {}" ,filterWord);
        }
        boolean test = badWordFiltering.blankCheck("ㄳㄲ");
        if (test) {
            log.debug("엥 !!: {}" ,filterWord);
        }
    }
}

package com.example.nowpt.mvc.controller;

import com.vane.badwordfiltering.BadWordFiltering;
import org.junit.jupiter.api.Test;

class BadWordTestTest {

    @Test
    void testClass(){
        BadWordFiltering badWordFiltering = new BadWordFiltering();

        boolean filterWord = badWordFiltering.check("ㅆㅂ");
        if (filterWord) {
            System.out.println(filterWord);
        }else{
            System.out.println("1번패스");
        }

        boolean test = badWordFiltering.blankCheck("ㄱㅅㄲ");
        if (test) {
            System.out.println("암ㅇ맞ㅇ"+filterWord);
        }else{
            System.out.println("2번패스");
        }
    }
}
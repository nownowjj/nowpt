package com.example.nowpt.mvc.service;

import org.apache.commons.lang3.RandomStringUtils;
import org.junit.jupiter.api.Test;

class MailServiceTest {

    @Test
    void createAuthenticationCode() {
        String[] randomLists = new String[5];

        for(int i = 0 ; i< 5 ; i++){
            randomLists[i] = (RandomStringUtils.random(8, true, true));
        }

        // 생성된 랜덤 문자열 출력
        for (String str : randomLists) {
            System.out.println(str + "\0" + "d?");
        }

    }

//    @Test
//    void jungbocjfl(){
//        int[] a = new int[8];  // 8 사이즈의 int 배열
//        int i = 0;
//        int n = 11;
//        while(n > 0){
//            a[i++]=n%2;
//            System.out.println("n%2 = " + n%2);
//            n/=2;
//            System.out.println("n = " + n);
//        }
//        for (i=7;i>=0;i--)
//            System.out.printf("%d",a[i]);
//    }


}
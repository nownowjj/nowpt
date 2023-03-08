package com.example.nowpt.mvc.controller;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;


public class TestClassTest {

    public static final String str1 = "Hello";
    public static String str2 = "Hello";


    @Test
    public static void main(String args[]) {
        String str1 = "Hello 못바꿔 ㅠ";
        // str1은 final로 선언되었기 때문에 값을 재할당 할 수 없음
        System.out.println(str1);

        // str2는 값 재할당 가능
        str2 = "Hello 바꿀꺼지롱";
        System.out.println(str2);

    }

}
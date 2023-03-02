package com.example.nowpt.mvc.controller;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;


public class TestClassTest {


     int i = 1;

    public int add1(int x , int y){
        return x+y;
    }


    @Test
    public void start(){
        System.out.println("add1 메소드 실행결과 : " + add1(3,5) );
        System.out.println("============================================");
        System.out.println("add2 메소드 실행결과 : " + add2(1,3) );
        System.out.println("============================================");
        System.out.println("start 메소드 위에 존재하는 i의 값 : " + i);
        System.out.println("============================================");
        System.out.println("start 메소드 아래에 존재하는 y의 값 : " + y);
    }

     int y = 2;

    public int add2 (int x , int y){
        return x+y;
    }
}
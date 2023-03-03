package com.example.nowpt.mvc.controller;

public class TestClass {

//    static int i = 3;


    public static void start(){
//        System.out.println(i);

        int i = 10;
        int b;

        // i는 10인데 i++을 하였기 때문에 i=11이 되는거임 따라서  >> b=i++이니까 b=11이 됨
        b = i++;
        System.out.println("b >>> " +b);
        System.out.println("i >>> " +i);

        // 위에서 i를 11로 증가시켜 놨기 때문에 i=11임 하지만 ++i를 하기 때문에 11>12, i=12가 됨 따라서 >> b도 12가됨
        b = ++i;
        System.out.println("b >>> " +b);
        System.out.println("i >>> " +i);

    }
}

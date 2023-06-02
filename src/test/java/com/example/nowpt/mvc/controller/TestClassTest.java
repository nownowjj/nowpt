package com.example.nowpt.mvc.controller;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class TestClassTest {

    @Test
    void a() {
        String str = "string";
        int n = 5;

        String result = "";
        for (int i = 0; i <= n; i++) {
            result += str;
        }
        System.out.println(result);
    }

}
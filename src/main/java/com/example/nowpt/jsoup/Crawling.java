package com.example.nowpt.jsoup;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;

public class Crawling {

    public static void main(String[] args) {
        final String inflearnUrl = "https://www.inflearn.com/courses/it-programming";
        Connection conn = Jsoup.connect(inflearnUrl);

        try {
            Document document = conn.get();
            Elements imageUrlElements = document.getElementsByClass("swiper-lazy");

            for (Element element : imageUrlElements) {
                System.out.println(element);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

package com.example.nowpt.mvc.naverMovie;

import lombok.Data;

import java.util.Date;

@Data
public class MoviesResponseDto {
    private int display;
    private Item[] items;

    @Data
    static class Item {
        public String title;
        public String link;
        public String image;
        public String subtitle;
        public String pubDate;
        public String director;
        public String actor;
        public float userRating;
    }
}
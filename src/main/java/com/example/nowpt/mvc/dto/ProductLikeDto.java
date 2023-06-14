package com.example.nowpt.mvc.dto;


import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@NoArgsConstructor
public class ProductLikeDto {
    @NonNull
    private long productSn;

    @NonNull
    private String memberEmail;

    private long memberSn;
}

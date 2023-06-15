package com.example.nowpt.mvc.dto;


import com.example.nowpt.mvc.model.RequestStatus;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto   {
    private long likeCount;
    private long productSn;
    private boolean active;
    private long frstRegistMembSn;
    private String keepYn;
    private LocalDateTime lastChangeDt;
    private long lastChangeMembSn;
    private long memberSn;
    private int productDiscountRate;
    private String productImage;
    private String productIntroduce;
    private String productNm;
    private int productPrice;
    private String remark;
    private RequestStatus requestStatus;
    private String useYn;
    private LocalDateTime frstRegistDt;
}

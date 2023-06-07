package com.example.nowpt.mvc.restcontoller.product;

import com.example.nowpt.cmm.code.Cd;
import com.example.nowpt.cmm.rvo.ResponseDto;
import com.example.nowpt.cmm.rvo.ResponseUtil;
import com.example.nowpt.repository.product.ProductRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
public class ProductRestController {
    private final ProductRepo productRepo;

    private static final String logFix = "[상품] ";

    int success = 1;

    @GetMapping("/api/auth/product")
    public ResponseDto<?> selectProduct(){
        log.debug(logFix+"조회");
        if(productRepo.findAll().size() > 0) return ResponseUtil.SUCCESS(Cd.SELECT_SUCCESS, productRepo.findAll());
        else return ResponseUtil.ERROR(Cd.SELECT_FAIL, null);
    }

//    @DeleteMapping("/api/auth/product")
//    public ResponseDto<?> deleteProduct(){
//        log.debug(logFix+"삭제");
//        Product product = new Product();
//        product.setProductSn(1L);
//
//        Product product1 = productRepo.findProductBy(product);
//        log.debug(logFix+"삭제 : {}" , product1);
//
//
//        if(p) return ResponseUtil.SUCCESS(Cd.DELETE_SUCCESS, success);
//        else return ResponseUtil.ERROR(Cd.DELETE_FAIL , null);
//    }

    @PostMapping("/api/auth/product")
    public ResponseDto<?> insertProduct(){
        log.debug(logFix+"등록");
        if(success == 1) return ResponseUtil.SUCCESS(Cd.POST_SUCCESS, success);
        else return ResponseUtil.ERROR(Cd.POST_FAIL , null);
    }
}

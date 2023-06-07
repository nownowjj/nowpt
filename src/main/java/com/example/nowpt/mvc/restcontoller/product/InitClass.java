package com.example.nowpt.mvc.restcontoller.product;

import com.example.nowpt.mvc.model.Product;
import com.example.nowpt.repository.product.ProductRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.List;

@Component
@Slf4j
@RequiredArgsConstructor
public class InitClass {
    private final ProductRepo productRepo;

    @PostConstruct
    public void initProduct(){
        log.debug("INIT 실행");
        List<Product> productCheck = productRepo.findProductByProductNm("INIT_상품");
        log.debug("INIT : {}" , productCheck);
        if(productCheck.size() < 1){
           Product product = new Product();
           product.setProductNm("INIT_상품");
           product.setProductIntroduce("INIT상품_소개");
           product.setProductPrice(10000);
           product.setProductDiscountRate(10);
           product.setRemark("INIT_비고");
           productRepo.save(product);
        }
    }
}

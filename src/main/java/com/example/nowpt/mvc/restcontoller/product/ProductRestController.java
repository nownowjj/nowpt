package com.example.nowpt.mvc.restcontoller.product;

import com.example.nowpt.cmm.code.Cd;
import com.example.nowpt.cmm.rvo.ResponseDto;
import com.example.nowpt.cmm.rvo.ResponseUtil;
import com.example.nowpt.mvc.model.Member;
import com.example.nowpt.repository.product.ProductRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
    public ResponseDto<?> selectProduct(@AuthenticationPrincipal Member member){
        log.debug("sn : {}",member.getMemberSn());
//        log.debug(logFix+"조회 : {}" , productRepo.findProductList(member));
        if( productRepo.findAll().size() > 0 ) return ResponseUtil.SUCCESS(Cd.SELECT_SUCCESS, productRepo.findProductList(member));
//        if( productRepo.findProductList(member) != null) return ResponseUtil.SUCCESS(Cd.SELECT_SUCCESS, productRepo.findProductList(member));
        else return ResponseUtil.ERROR(Cd.SELECT_FAIL, null);
    }

    @PostMapping("/api/auth/product")
    public ResponseDto<?> insertProduct(){
        log.debug(logFix+"등록");
        if(success == 1) return ResponseUtil.SUCCESS(Cd.POST_SUCCESS, success);
        else return ResponseUtil.ERROR(Cd.POST_FAIL , null);
    }
}

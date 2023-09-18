package com.example.nowpt.mvc.restcontoller.product;

import com.example.nowpt.cmm.code.Cd;
import com.example.nowpt.cmm.rvo.ResponseDto;
import com.example.nowpt.cmm.rvo.ResponseUtil;
import com.example.nowpt.mvc.dto.UserEttDto;
import com.example.nowpt.mvc.repository.member.MemberRepo;
import com.example.nowpt.mvc.repository.product.ProductRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
public class ProductRestController {
    private final ProductRepo productRepo;
    private final MemberRepo memberRepo;

    private static final String logFix = "[상품] ";

    int success = 1;

    @PostMapping("/api/auth/product")
    public ResponseDto<?> selectProduct(@RequestBody UserEttDto userEttDto){
        log.debug("진입- : {}" , userEttDto);
        log.debug("진입-2 : {}" , userEttDto.getMembEmail());
        long sn = 0;

        boolean check = userEttDto.getMembEmail() != null;
        boolean check2 = !(userEttDto.getMembEmail().equals(""));
        log.debug("check : {} , check2 : {}" , check , check2);

        if (!(userEttDto.getMembEmail().equals(""))) {
            log.debug("로그인 임");
            sn =  memberRepo.findByEmailAddr(userEttDto.getMembEmail()).getMemberSn();
        }

        if( productRepo.findProductList(sn ,false) != null) return ResponseUtil.SUCCESS(Cd.SELECT_SUCCESS, productRepo.findProductList(sn ,false));
        else return ResponseUtil.ERROR(Cd.SELECT_FAIL, null);
    }

//    @PostMapping("/api/auth/product")
//    public ResponseDto<?> insertProduct(){
//        log.debug(logFix+"등록");
//        if(success == 1) return ResponseUtil.SUCCESS(Cd.POST_SUCCESS, success);
//        else return ResponseUtil.ERROR(Cd.POST_FAIL , null);
//    }
}

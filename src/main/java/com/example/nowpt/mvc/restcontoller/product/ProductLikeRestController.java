package com.example.nowpt.mvc.restcontoller.product;

import com.example.nowpt.cmm.code.Cd;
import com.example.nowpt.cmm.rvo.ResponseDto;
import com.example.nowpt.cmm.rvo.ResponseUtil;
import com.example.nowpt.mvc.dto.ProductLikeDto;
import com.example.nowpt.mvc.model.ProductLike;
import com.example.nowpt.mvc.service.product.ProductLikeService;
import com.example.nowpt.repository.member.MemberRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
public class ProductLikeRestController {
    private final ProductLikeService productLikeService;
    private final MemberRepo memberRepo;
    private static final String logFix ="[좋아요] ";

    /**
     * 상품 좋아요 신규 , 재등록 , 취소
     */
    @PostMapping("/api/auth/product/likeEvent")
    public ResponseDto<?> insertLike(@RequestBody ProductLikeDto productLikeDto){
        // redux-persist store에서 userSn을 보관하지 않고 있다 따라서 email로 조회 후 Sn을 수집한다.
        productLikeDto.setMemberSn(memberRepo.findByEmailAddr(productLikeDto.getMemberEmail()).getMemberSn());

        // 좋아요 이력을 조회
        ProductLike like = productLikeService.findByMemberSnAndProductSn(productLikeDto);
        
        // 이력이 없을경우는 신규 등록
        if(like == null){ // 신규 등록
            return ResponseUtil.SUCCESS(Cd.LIKE_SUCCESS, productLikeService.insertLike(productLikeDto));
            
        // "N"일 경우는 재등록
        } else if (like.getUseYn().equals("N")) { // 재등록
            return ResponseUtil.SUCCESS(Cd.LIKE_SUCCESS,productLikeService.updateLike(like));
            
        // else => 취소
        } else{ // 취소
            return ResponseUtil.SUCCESS(Cd.LIKE_C_SUCCESS,productLikeService.deleteLike(like));
        }
    }

}

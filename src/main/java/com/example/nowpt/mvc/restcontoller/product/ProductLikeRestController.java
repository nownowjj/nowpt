package com.example.nowpt.mvc.restcontoller.product;

import com.example.nowpt.cmm.code.Cd;
import com.example.nowpt.cmm.rvo.ResponseDto;
import com.example.nowpt.cmm.rvo.ResponseUtil;
import com.example.nowpt.mvc.dto.ProductDto;
import com.example.nowpt.mvc.dto.ProductLikeDto;
import com.example.nowpt.mvc.model.Member;
import com.example.nowpt.mvc.model.ProductLike;
import com.example.nowpt.mvc.service.product.ProductLikeService;
import com.example.nowpt.mvc.repository.member.MemberRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
public class ProductLikeRestController {
    private final ProductLikeService productLikeService;
    private final MemberRepo memberRepo;
    private static final String logFix ="[좋아요] ";

    /**
     * 상품 좋아요 신규 , 재등록 , 취소
     * @param {membEmail,productSn}
     */
    @PostMapping("/api/auth/product/likeEvent")
    public ResponseDto<?> insertProductLike(@RequestBody ProductLikeDto productLikeDto){
        // redux-persist store에서 memberSn을 보관하지 않고 있다 따라서 email로 조회 후 Sn을 수집한다.
        productLikeDto.setMemberSn(memberRepo.findByEmailAddr(productLikeDto.getMemberEmail()).getMemberSn());

        // 좋아요 이력을 조회
        ProductLike like = productLikeService.findByMemberSnAndProductSn(productLikeDto);
        
        // 이력이 없을경우는 신규 등록
        if(like == null) return ResponseUtil.SUCCESS(Cd.LIKE_SUCCESS, productLikeService.insertLike(productLikeDto));// 신규 등록
        // "N"일 경우는 재등록
         else if (like.getUseYn().equals("N")) return ResponseUtil.SUCCESS(Cd.LIKE_SUCCESS,productLikeService.updateLike(like));// 재등록
        // else => 취소
         else return ResponseUtil.SUCCESS(Cd.LIKE_C_SUCCESS,productLikeService.deleteLike(like));// 취소

    }

    /**
     * 좋아요한 상품만 조회
     * -로그인이 되어 있고 Like Yn이 Y인것만
     */
    @GetMapping("/api/auth/product/likeEvent")
    public ResponseDto<?> selectProductLike(@AuthenticationPrincipal Member member){
        log.debug("좋아요 리스트 진입 성공");
        List<ProductDto> likeProductList = productLikeService.findLikeProductByMemberSn(member.getMemberSn());

        if (!likeProductList.isEmpty())return ResponseUtil.SUCCESS(Cd.SELECT_SUCCESS, likeProductList);
        else return ResponseUtil.SUCCESS(Cd.SELECT_FAIL, null);
    }

}

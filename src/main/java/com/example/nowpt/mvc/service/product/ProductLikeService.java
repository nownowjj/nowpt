package com.example.nowpt.mvc.service.product;

import com.example.nowpt.mvc.dto.ProductDto;
import com.example.nowpt.mvc.dto.ProductLikeDto;
import com.example.nowpt.mvc.model.ProductLike;
import com.example.nowpt.repository.product.ProductRepo;
import com.example.nowpt.repository.product.like.ProductLikeRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductLikeService {
    private final ProductLikeRepo productLikeRepo;
    private final ProductRepo productRepo;

    // membSn과 productSn으로 이력을 조회
    public ProductLike findByMemberSnAndProductSn(ProductLikeDto productLikeDto){
        return productLikeRepo.findByMemberSnAndProductSn(productLikeDto.getMemberSn(),productLikeDto.getProductSn());
    }


    // 좋아요 이력이 없을시 신규 생성
    public ProductLike insertLike(ProductLikeDto productLikeDto) {
        ProductLike like = new ProductLike();
        like.setProductSn(productLikeDto.getProductSn());
        like.setMemberSn(productLikeDto.getMemberSn());

        return productLikeRepo.save(like);
    }

    // 재등록시 Y
    public ProductLike updateLike(ProductLike productLike) {
        productLike.setUseYn("Y");
        return productLikeRepo.save(productLike);
    }

    // 취소시 N
    public ProductLike deleteLike(ProductLike productLike) {
        productLike.setUseYn("N");
        return productLikeRepo.save(productLike);
    }

    // 좋아요한 상품 조회
    public List<ProductDto> findLikeProductByMemberSn(Long memberSn){
        return productRepo.findProductList(memberSn , true);
    }
}

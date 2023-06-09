package com.example.nowpt.mvc.service.product;

import com.example.nowpt.mvc.dto.ProductLikeDto;
import com.example.nowpt.mvc.model.ProductLike;
import com.example.nowpt.repository.product.ProductLikeRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductLikeService {
    private final ProductLikeRepo productLikeRepo;

    public ProductLike findByMemberSnAndProductSn(ProductLikeDto productLikeDto){
        return productLikeRepo.findByMemberSnAndProductSn(productLikeDto.getMemberSn(),productLikeDto.getProductSn());
    }


    public ProductLike insertLike(ProductLikeDto productLikeDto) {
        ProductLike like = new ProductLike();
        like.setProductSn(productLikeDto.getProductSn());
        like.setMemberSn(productLikeDto.getMemberSn());

        return productLikeRepo.save(like);
    }

    public ProductLike updateLike(ProductLike productLike) {
        productLike.setUseYn("Y");
        return productLikeRepo.save(productLike);
    }

    public ProductLike deleteLike(ProductLike productLike) {
        productLike.setUseYn("N");
        return productLikeRepo.save(productLike);
    }
}

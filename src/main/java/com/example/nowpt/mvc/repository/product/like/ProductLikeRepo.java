package com.example.nowpt.mvc.repository.product.like;

import com.example.nowpt.mvc.model.ProductLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductLikeRepo extends JpaRepository<ProductLike, Long> , ProductLikeCustomRepo {
    ProductLike findByMemberSnAndProductSn(long memberSn , long productSn);

}

package com.example.nowpt.repository.product.like;

import com.example.nowpt.mvc.model.ProductLike;
import com.example.nowpt.repository.product.ProductCustomRepo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductLikeRepo extends JpaRepository<ProductLike, Long> , ProductCustomRepo {
    ProductLike findByMemberSnAndProductSn(long memberSn , long productSn);

}

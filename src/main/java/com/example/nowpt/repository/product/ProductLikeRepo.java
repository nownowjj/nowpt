package com.example.nowpt.repository.product;

import com.example.nowpt.mvc.model.ProductLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductLikeRepo extends JpaRepository<ProductLike, Long> , ProductCustomRepo {
//    List<Product> findProductByProductNm(String productNm);

    ProductLike findByMemberSnAndProductSn(long memberSn , long productSn);

}

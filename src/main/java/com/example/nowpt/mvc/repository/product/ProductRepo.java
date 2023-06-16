package com.example.nowpt.mvc.repository.product;

import com.example.nowpt.mvc.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product , Long> , ProductCustomRepo {
    List<Product> findProductByProductNm(String productNm);
}

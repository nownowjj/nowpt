package com.example.nowpt.mvc.repository.product;

import com.example.nowpt.mvc.dto.ProductDto;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductCustomRepo {
    List<ProductDto> findProductList(Long memberSn , boolean myProduct);

}

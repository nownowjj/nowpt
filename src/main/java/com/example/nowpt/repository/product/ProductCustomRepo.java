package com.example.nowpt.repository.product;

import com.example.nowpt.mvc.dto.ProductDto;
import com.example.nowpt.mvc.model.Member;
import com.example.nowpt.mvc.model.Product;
import com.querydsl.core.Tuple;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductCustomRepo {
    List<ProductDto> findProductList(Member member);

}

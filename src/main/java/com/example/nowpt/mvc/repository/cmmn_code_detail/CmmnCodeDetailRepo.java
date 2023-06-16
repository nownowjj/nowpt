package com.example.nowpt.mvc.repository.cmmn_code_detail;

import com.example.nowpt.mvc.model.CmmnCodeDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CmmnCodeDetailRepo extends JpaRepository<CmmnCodeDetail, Long>, CmmnCodeDetailCustomRepo{
	CmmnCodeDetail findByCodeIdAndCodeValue(String codeId, String codeValue);
}

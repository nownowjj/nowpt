package com.example.nowpt.cmm.utils;

import com.example.nowpt.cmm.code.Cd;
import com.example.nowpt.mvc.model.CmmnCodeDetail;
import com.example.nowpt.mvc.repository.cmmn_code_detail.CmmnCodeDetailRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
@Component
@Slf4j
public class EntityUtil {
@Autowired private static CmmnCodeDetailRepo ccdRepo;
	
	public CmmnCodeDetail getMemberTyCmm(String codeValue) {
		log.debug("getMemberTyCmm {} " ,codeValue);
		return ccdRepo.findByCodeIdAndCodeValue(Cd.CODE_ID_MEMBER_TY, codeValue);
	}
	
	public CmmnCodeDetail getMemberSttusCmm(String codeValue) {
		log.debug("getMemberSttusCmm {} " ,codeValue);
		return ccdRepo.findByCodeIdAndCodeValue(Cd.CODE_ID_MEMBER_STTUS, codeValue);
	}
	
	public CmmnCodeDetail getMoneyTransferCmm(String codeValue) {
		return ccdRepo.findByCodeIdAndCodeValue(Cd.CODE_ID_MONEY_TSF_TY_CODE, codeValue);
	}
	
	public CmmnCodeDetail getMoneyMeanCmm(String codeValue) {
		return ccdRepo.findByCodeIdAndCodeValue(Cd.CODE_ID_MONEY_MEAN_CODE, codeValue);
	}
}

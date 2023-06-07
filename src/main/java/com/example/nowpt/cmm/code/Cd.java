package com.example.nowpt.cmm.code;
/*공통코드 관련*/
public interface Cd {
	String POST_SUCCESS = "등록 성공";
	String POST_FAIL = "등록 실패";

	String DELETE_SUCCESS = "삭제 성공";
	String DELETE_FAIL = "삭제 실패";

	String PUT_SUCCESS = "수정 성공";
	String PUT_FAIL = "수정 실패";

	String SELECT_SUCCESS = "조회 성공";
	String SELECT_FAIL = "조회 실패";


	String ANNONYMOUSE_USER = "anonymousUser";
	
	String CODE_ID_MEMBER_TY = "MEMBER_TY_CODE";
	String CODE_ID_MEMBER_STTUS = "MEMBER_STTUS_CODE";
	String CODE_ID_MONEY_TSF_TY_CODE = "MONEY_TSF_CODE";
	String CODE_ID_MONEY_MEAN_CODE = "MONEY_MEAN_CODE";
	
	String MEMBER_TY_ADMIN = "ROLE_ADMIN";
	String MEMBER_TY_ADMIN_NM = "관리자";
	String MEMBER_TY_SELLER = "ROLE_SELLER";
	String MEMBER_TY_SELLER_NM = "판매자";
	String MEMBER_TY_USER = "ROLE_USER";
	String MEMBER_TY_USER_NM = "사용자";
	
	String MEMBER_STTUS_OK = "01";
	String MEMBER_STTUS_OK_NM = "정상";
	String MEMBER_STTUS_DORMACY = "02";
	String MEMBER_STTUS_DORMACY_NM = "휴면";
	String MEMBER_STTUS_RESIGN = "99";
	String MEMBER_STTUS_RESIGN_NM = "탈퇴";
	
	String MONEY_TSF_TY_CHARGE = "01";
	String MONEY_TSF_TY_CHARGE_NM = "머니충전";
	String MONEY_TSF_TY_USE = "02";
	String MONEY_TSF_TY_USE_NM = "머니로 결제";
	String MONEY_TSF_TY_EXCHANGE = "03";
	String MONEY_TSF_TY_EXCHANGE_NM = "머니를현금으로환전";
	String MONEY_TSF_TY_API = "04";
	String MONEY_TSF_TY_API_NM= "외부결제";

	
	String MONEY_MEAN_CARD = "01";
	String MONEY_MEAN_CARD_NM = "카드";
	String MONEY_MEAN_ACNT = "02";
	String MONEY_MEAN_ACNT_NM = "계좌";
	String MONEY_MEAN_MONEY = "03";
	String MONEY_MEAN_MONEY_NM = "머니";
}

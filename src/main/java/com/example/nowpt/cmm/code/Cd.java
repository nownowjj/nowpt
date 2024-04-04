package com.example.nowpt.cmm.code;
/*공통코드 관련*/
public interface Cd {
	String API_FAIL = "요청 실패";

	String LIKE_SUCCESS = "좋아요 성공";
	String LIKE_C_SUCCESS = "좋아요 취소";
	String POST_SUCCESS = "등록 성공";
	String POST_FAIL = "등록 실패";

	String DELETE_SUCCESS = "DESUCCESS";
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

	String LOGIN_SUCCESS = "로그인 성공";
	String LOGIN_FAIL = "로그인 실패";

	// Friend
	String F_DIRECT_ACCEPT = "DIRECT_ACCEPT";  // 친구 요청을 보낼 떄 상대방이 이미 요청을 보냄
	String F_DIRECT_ACCEPT_MSG = "친구 요청을 보낸 대상이 먼저 요청을 보내셔서 바로 친구가 됩니다"; // 친구 요청을 보낼 떄 상대방이 이미 요청을 보냄
	String F_REQUEST_SUCCESS = "REQUEST_SUCCESS"; // 친구 요청 성공
	String F_REQUEST_SUCCESS_MSG = "친구 요청 성공!"; // 친구 요청 성공


	// 친구 요청 수락 OR 거절
	String F_CANCELED_REQUEST = "REQUEST_CANCELED"; // 요청을 수락하였지만 상대방이 요청을 취소함
	String F_CANCELED_REQUEST_MSG = "상대방이 요청을 취소 하셔서 친구 관계가 성립되지 않습니다"; // 요청을 수락하였지만 상대방이 요청을 취소함
	String F_REQUEST_ACCEPT = "REQUEST_ACCEPT";
	String F_REQUEST_ACCEPT_MSG = "수락 완료";
	String F_REQUEST_REFUSE = "REQUEST_REFUSE";
	String F_REQUEST_REFUSE_MSG = "거절 완료";

	// 친구요청 취소
	String F_REQUEST_CANCEL_SUCCESS ="REQUEST_CANCEL_SUCCESS";
	String F_REQUEST_CANCEL_SUCCESS_MSG ="요청이 취소되었습니다";
	String F_REQUEST_ALREADY_ACCEPT ="REQUEST_ALREADY_ACCEPT";
	String F_REQUEST_ALREADY_ACCEPT_MSG ="상대방이 이미 요청을 수락하였습니다<br/>친구목록을 확인해 주세요";
}

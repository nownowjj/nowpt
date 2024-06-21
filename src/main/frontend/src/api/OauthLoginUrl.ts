const KAKAO_CLIENT_ID = "b700a332c015772d85ff96c69eed7665";
const NAVER_CLIENT_ID = "4cwWn7LL7M_zyYFJyzDy";

const HOST_NAME = `${window.location.protocol}//${window.location.host}`
export const REDIRECT_URI = `${HOST_NAME}/oauth`;

export const KAKAO_STATE = "KAKAO";
export const NAVER_STATE = "NAVER";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&state=${KAKAO_STATE}`;
export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${NAVER_STATE}&redirect_uri=${REDIRECT_URI}`;
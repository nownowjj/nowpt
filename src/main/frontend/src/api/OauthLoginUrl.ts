const KAKAO_CLIENT_ID = "77cbf4dbfe4487f6bb02d3360642a389";
const NAVER_CLIENT_ID = "4cwWn7LL7M_zyYFJyzDy";

const REDIRECT_URI = 'http://localhost:3000/oauth';

export const KAKAO_STATE = "KAKAO";
export const NAVER_STATE = "NAVER";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&state=${KAKAO_STATE}`;
export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${NAVER_STATE}&redirect_uri=${REDIRECT_URI}`;
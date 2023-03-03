const KAKAO_CLIENT_ID = "77cbf4dbfe4487f6bb02d3360642a389";
const KAKAO_REDIRECT_URI = 'http://localhost:3000/oauth';

const NAVER_CLIENT_ID = "4cwWn7LL7M_zyYFJyzDy";
const NAVER_REDIRECT_URI = 'http://localhost:3000/oauthNaver';
const NAVER_STATE = "hello"

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${NAVER_STATE}&redirect_uri=${NAVER_REDIRECT_URI}`;
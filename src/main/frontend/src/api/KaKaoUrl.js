const CLIENT_ID = "77cbf4dbfe4487f6bb02d3360642a389";
// const REDIRECT_URI = 'http://localhost:8060/oauth';
const REDIRECT_URI = 'http://localhost:3000/oauth';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

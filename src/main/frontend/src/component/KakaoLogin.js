const KakaoLogin = () => {
    const router = useRouter();

    const clickKakaoLoginHandler = () => {
        console.log("kakao 로그인")
        router.push({
            pathname: "https://kauth.kakao.com/oauth/authorize",
            query: {
                "response_type": "code",
                "client_id": "b51a521566c14452ea05b20e986ecb2e",
                "redirect_uri": "http://localhost:5000/callback/kakao"
            }
        })
    }

    return (
        <div>
            <div>
                <Button
                    style={{"background": "#FADF0A"}}
                    onClick={clickKakaoLoginHandler}>
                    카카오 로그인
                </Button>
            </div>
        </div>
    )
}


export default KakaoLogin
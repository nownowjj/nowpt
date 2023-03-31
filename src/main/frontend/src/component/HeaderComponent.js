import {useNavigate} from "react-router";
import {li} from "../styles/style";
import {useEffect, useState} from "react";
import isAuth from "../services/isAuth";
import {useDispatch, useSelector} from "react-redux";
import {logout3} from "../redux/slice/userSlice";


const HeaderComponent = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState("");
    const Admin = "ROLE_ADMIN";
    const dispatch = useDispatch();


    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    const logout = () => {
        if (window.confirm("정말 로그아웃을 하시겠습니까?")) {
            dispatch(logout3());
            window.sessionStorage.removeItem("accessToken");
            navigate("/go/login");
        } else {
            return false;
        }
    }

    const goMyPage = () => {
        if (auth == null) {
            alert("로그인을 해주세요");
            return false;
        }
        navigate("/go/common/myPage")
    }



    useEffect(() => {
        setAuth(isAuth());
    },)


    function falseEvent() {
        alert("사용불가")
        return false;
    }

    return (
        <div className="sider siderOn">
            <ul style={{border: "1px solid black", margin: "0px"}}>
                <li style={li}
                    onClick={() => {
                        navigate("/")
                    }
                    }
                >
                    홈
                </li>
                <li
                    style={li}
                    onClick={() => {
                        navigate("/go/main")
                    }
                    }
                    // className="Fli on cmli"
                >
                    메인
                </li>

                <li
                    style={li}
                    onClick={() => navigate("/go/test/jpa")}
                >
                    어드민 기능 테스트
                </li>
                <li
                    style={li}
                    onClick={() => navigate("/go/login")}
                >
                    로그인
                </li>
                <li
                    style={li}
                    onClick={() => logout()}
                >
                    로그아웃
                </li>

                {
                    auth === Admin
                        ?
                        <li
                            style={li}
                            onClick={() => navigate("/go/notice")}
                        >
                            공지사항 등록
                        </li>
                        :
                        null
                }

                <li
                    style={li}
                    onClick={() => navigate("/go/common/myPage")}
                >
                    내 정보
                </li>

                {
                    auth != null
                    ?
                        <li
                            style={li}
                            // onClick={falseEvent}
                            onClick={() => navigate("/go/chat")}
                        >
                            채팅
                        </li>  :null
                }


                <li
                    style={li}
                    onClick={() => navigate("/go/meetingRoom")}
                >
                    예약
                </li>

                <p>
                    접속한 계정의 ROLE :
                    {
                        auth != null
                            ?
                            auth
                            :
                            "비로그인"
                    }
                </p>


            </ul>
        </div>

    )
}

export default HeaderComponent
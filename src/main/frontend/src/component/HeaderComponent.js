import {useNavigate} from "react-router";
import {li} from "../styles/style";
import {useEffect, useState} from "react";
import isAuth from "../services/isAuth";


function HeaderComponent(props) {
    const navigate = useNavigate();
    const [auth, setAuth] = useState("");

    const logout = () => {
        if (window.confirm("정말 로그아웃을 하시겠습니까?")) {
            window.sessionStorage.removeItem("accessToken");
            navigate("/api/login");
        } else {
            return false;
        }
    }

    useEffect(() => {
        setAuth(isAuth());
    })


    return (
        <div id='hideUl' className="sider siderOn">
            <ul style={{border: "1px solid black", margin: "0px"}}>
                <li style={li}
                    onClick={() => {
                        navigate("/")
                    }
                    }
                    // className="Fli on cmli"
                >
                    홈
                </li>
                <li
                    style={li}
                    onClick={() => {
                        navigate("/api/main")
                    }
                    }
                    // className="Fli on cmli"
                >
                    메인
                </li>


                <li
                    style={li}
                    onClick={() => navigate("/api/test")}
                >
                    어드민 기능 테스트
                </li>
                <li
                    style={li}
                    onClick={() => navigate("/api/login")}
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
                    auth === "ROLE_ADMIN"
                        ?
                        <li
                            style={li}

                        >
                            어드민만 보임
                        </li>
                        :
                        <li
                            style={li}>
                            ㄴㄴㄴ..
                        </li>
                }
                <p>접속한 계정의 ROLE : {auth}</p>


            </ul>
        </div>

    )
}

export default HeaderComponent
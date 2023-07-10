import {useNavigate} from "react-router";
import {li} from "../styles/style";
import Role from "../services/authService/Role";
import {useDispatch, useSelector} from "react-redux";
import {logoutAction} from "../redux/slice/userSlice";
import ProfileComponent from "./ProfileComponent";


const HeaderComponent = () => {
    const navigate = useNavigate();
    const Admin = "ROLE_ADMIN";
    const dispatch = useDispatch();

    const role = Role();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    const logout = () => {
        if (window.confirm("정말 로그아웃을 하시겠습니까?")) {
            dispatch(logoutAction());
            window.sessionStorage.removeItem("accessToken");
            navigate("/go/login");
        } else {
            return false;
        }
    }

    function falseEvent() {
        alert("사용불가")
        return false;
    }

    return (
            <div className="sider siderOn">
                <ProfileComponent/>
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
                        onClick={() => navigate("/scroll")}
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
                        role === Admin
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
                    <li
                        style={li}
                        onClick={() => navigate("/go/product")}
                    >
                        상품
                    </li>
                    <li
                        style={li}
                        onClick={() => navigate("/go/meetingRoom")}
                    >
                        예약
                    </li>

                    <p>
                        접속한 계정의 ROLE :
                        {
                            role != null
                                ?
                                role
                                :
                                "비로그인"
                        }
                    </p>


                </ul>
            </div>
    );
}

export default HeaderComponent
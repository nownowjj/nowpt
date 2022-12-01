import { useNavigate } from "react-router";
import {li} from "./style";


// const li =
//     {width:"50%",height:"50px",
//         display:"flex",alignItems:"center",
//         paddingLeft:"10px",fontSize:"18px",
//         cursor:"pointer",border:"1px solid red"}


// const HeaderComponent =() => {
function HeaderComponent (){
    const navigate = useNavigate();

    return (
        <div id='hideUl' className="sider siderOn">
            <ul style={{border: "1px solid black", margin: "0px"}}>
                <li
                    style={li}
                    onClick={() => {
                        navigate("/main")
                    }
                    }
                    className="Fli on cmli"
                >
                     메인
                </li>


                <li
                    style={li}
                    onClick={() => navigate("/test")}
                    className="Sli cmli "
                >
                        테스트
                </li>
                <li
                    style={li}
                    onClick={() => navigate("/login")}
                    className="Sli cmli "
                >
                        로그인
                </li>


            </ul>
        </div>

    )
}

export default HeaderComponent
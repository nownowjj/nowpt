import React, {useEffect, useState} from "react";
import {getMembInfo, updateMembAddr} from "../api/Api";
import Input from "../component/Input";
import Button from "../component/JoinButton";
import {validateEmail} from "../services/validate";
import "aos/dist/aos.css";
import AOS from "aos";
import CountUp from "react-countup";

const MyPageComponent = () => {
    // 해당 멤버 정보
    const [membInfo, setMembInfo] = useState([""]);
    // 업데이트할 메일
    const [newEmail,setNewEmail] = useState("");
    // 변경한 메일
    const [successEmail,setSuccessEmail] = useState(null);

    useEffect(() => {
        console.log("aos")
        AOS.init();
    })

    useEffect(() => {
        getMembInfo()
            .then(response => {
                // console.log("myPage")
                console.log('Response Object is: %O', response)
                setMembInfo(response);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    const mb = {marginBottom:"200px"}

    const leftIcon = { backgroundImage: "url("+ membInfo.profileImage +")" , width:"300px",height:"300px",backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover",borderRadius:"50%"};

    const changeEmail=(value)=>{
        // console.log(value);
        setNewEmail(value);
    }

    const updateEmail=(event)=>{
        if(newEmail === ""){
            event.preventDefault();
        }
        // 이메일 유효성 검사
        if(
            validateEmail(newEmail,membInfo.emailAddr)
        ){
            updateMembAddr(newEmail)
                .then(response =>{
                    // console.log(response.data)
                    alert("변경성공")
                    setSuccessEmail(newEmail);
                })
                .catch(error =>{
                    console.log(error);
                    alert("변경실패 문제가 있어요")
                })
        }else{
            alert("문제가 있어~");
        }
    }

    return (
        <div>
            My 페이지
            <br/>
            <h2>내정보</h2>

            <div>기존 email : {membInfo.emailAddr}</div>

            {
                successEmail !== null
                ?
                    <div>변경한 email : {successEmail}</div>
                :
                    null
            }

            <label>emailAddr : </label>
            <Input
                id="emailInput"
                // value={membInfo.emailAddr ?  membInfo.emailAddr : ''}
                onChange={changeEmail}
            >
            </Input>
            {/* 새롭게 입력한 이메일로 변경 요청 */}
            <Button value="변경" onClick={updateEmail}></Button>
            
            <div>memberSn : {membInfo.memberSn}</div>
            <CountUp end={100} duration={1}/>

            <div>useYn : {membInfo.useYn}</div>
            <div>membId : {membInfo.membId}</div>
            <div>membNm : {membInfo.membNm}</div>
            <div>frstRegistDt : {membInfo.frstRegistDt}</div>
            
            <div style={mb}>profile_image : {membInfo.profileImage}</div>
            
            <div>
                본인인증 여부 :
                {
                    membInfo.identityVerification === 'N'
                    ?
                        <span>안함</span>
                        :
                        <span>함</span>
                }

            </div>

            {
                membInfo.profileImage
                ?
                <div data-aos="fade-left" style={leftIcon}></div>
                : 
                <div>프로필이 존재하지 않음</div>
            }
            
        </div>
    )
}

export default MyPageComponent;
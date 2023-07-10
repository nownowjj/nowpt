import React from 'react';
import UserEtt from "../services/UserEtt";
import styled from "styled-components";
import loginFalse from "../assets/mgu.jpg";
import loginTrueButNoProfile from "../assets/ggwak.png";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";


const ProfileComponent = (data) => {
    const navigate = useNavigate();
    let userEtt = UserEtt();
    let isLogin = useSelector((state) => state.user.value.isLoggedIn);
    // 비로그인시 맹구 이미지
    let imageSrc = loginFalse;

    if (userEtt.membEmail){
        // 로그인을 하였지만 프로필이 없음
        if(!userEtt.profileImage) imageSrc = loginTrueButNoProfile;
        // 로그인을 하였고 프로필이 있음
        else imageSrc = userEtt.profileImage;
    }
    // onClick={() => navigate("/go/common/myPage")}

    return (
        <ProfileImageWrap size={data.size}  onClick={() => navigate("/go/common/myPage")}>
            <ProfileImage src={imageSrc}/>
            {isLogin ? ' ' : 'no'}
        </ProfileImageWrap>
    );
};

export default ProfileComponent;

const ProfileImage = styled.img`
    width : 100%;
    height: 100%;
    border-radius:50%;
    object-fit: cover;
    box-sizing: border-box;
      border:1px solid black;
`

const ProfileImageWrap = styled.div`
    width : ${({size}) => (size ? `${size}px` : `100px` )} ;
    height: ${({size}) => (size ? `${size}px` : `100px` )} ;
    border-radius:50%;
`
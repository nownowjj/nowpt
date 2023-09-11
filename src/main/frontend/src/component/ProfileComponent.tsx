import React from 'react';
import styled from "styled-components";
import loginTrueButNoProfile from "../assets/ggwak.png";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {route} from "../services/remocon";
import {RootState} from '../redux/store/store';
import {UserInterface, UserState} from "../redux/slice/userSlice"; // 이 부분을 import 해야 합니다

export interface ProfileComponentProps {
    naviUse: boolean;
    size: number;
    style?: React.CSSProperties;
}

/**
 * 
 * @param data {naviUse , size}
 * @returns 프로필 이미지
 */
const ProfileComponent: React.FC<ProfileComponentProps> = (data) => {
    const navigate = useNavigate();
    let user = useSelector((state:RootState) => state.user as UserState);
    console.log("??");
    console.log(user);

    // 비로그인시 맹구 이미지
    let imageSrc;
    if (user.isLoggedIn && user.user){
        // 로그인을 하였지만 프로필이 없음
       imageSrc = user.user.profileImage ? user.user.profileImage :  loginTrueButNoProfile;
    }

    return (
        <ProfileImageWrap size={data.size}  onClick={() => data.naviUse && navigate(route.myPage)}
            style={{
                ...data.style
            }}>
            <ProfileImage src={imageSrc}/>
            {/*{isLogin ? ' ' : 'no'}*/}
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
`

const ProfileImageWrap = styled.div<{size:number}>`
    width : ${({size}) => (size ? `${size}px` : `100px` )} ;
    height: ${({size}) => (size ? `${size}px` : `100px` )} ;
    border-radius:50%;
`
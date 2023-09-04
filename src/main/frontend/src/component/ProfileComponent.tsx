import React from 'react';
import UserEtt from "../services/UserEtt";
import styled from "styled-components";
import loginFalse from "../assets/mgu.jpg";
import loginTrueButNoProfile from "../assets/ggwak.png";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {route} from "../services/remocon";
import { RootState } from '../redux/store/store'; // 이 부분을 import 해야 합니다

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
    let userEtt = UserEtt();

    // RootState 타입으로 useSelector에 타입을 지정합니다
    let isLogin = useSelector((state: RootState) => state.user.isLoggedIn);
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
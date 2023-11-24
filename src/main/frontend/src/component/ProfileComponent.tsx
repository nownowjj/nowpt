import React from 'react';
import styled from "styled-components";
import loginTrueButNoProfile from "../assets/ggwak.png";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {route} from "../services/remocon";
import {RootState} from '../redux/store/store';
import {UserState} from "../redux/slice/userSlice"; // 이 부분을 import 해야 합니다

export interface ProfileComponentProps {
    naviUse: boolean;
    size: number;
    style?: React.CSSProperties;
    friendImageSrc?:string;
    isMy?:boolean;
}

/**
 * 
 * @param data {naviUse , size}
 * @returns 프로필 이미지
 */
const ProfileComponent: React.FC<ProfileComponentProps> = (data) => {

    const navigate = useNavigate();
    let user = useSelector((state: RootState) => state.user as UserState);
    let imageSrc;

    if(data.isMy){
        if (user.isLoggedIn && user.user) imageSrc = user.user.profileImage ? user.user.profileImage : loginTrueButNoProfile;  // 로그인을 하였지만 프로필이 없음
    }
    else {
        imageSrc = data.friendImageSrc ? data.friendImageSrc : loginTrueButNoProfile;
    }


    return (
        <ProfileImageWrap size={data.size}  onClick={() => data.naviUse && navigate(route.myPage)}
            style={{
                ...data.style
            }}>
            <ProfileImage src={imageSrc}/>
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
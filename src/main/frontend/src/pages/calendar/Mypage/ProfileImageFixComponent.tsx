import React, {useState} from 'react';
import styled from "styled-components";
import {uploadImage} from "../../../api/ImageApi";
import {updateUserProfile} from "../../../api/Api";
import {useCustomQueryClient} from "../../../hooks/useCustomQueryClient";
import defaultImg from "../../../assets/imgUpload.png";

interface FixProps {
    callback:()=>void;
}

const ProfileImageFixComponent = ({callback}:FixProps) => {
    const [mainImg, setMainImg] = useState<string>(defaultImg);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string>('');
    const {invalidateQueries} = useCustomQueryClient();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files && event.target.files[0];
            if (!file) return;

            const reader = new FileReader();

            reader.onload = function (event: ProgressEvent<FileReader>) {
                if (event.target && typeof event.target.result === 'string') {
                    setMainImg(event.target.result);
                }
            };

            reader.readAsDataURL(file);


            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        const result = await uploadImage(formData);
        console.log(result);

        const apiResult = await updateUserProfile(result);
        console.log(apiResult.data);

        if(apiResult) {
            invalidateQueries(['userProfile']);
            // window.location.reload()
        }

    };


    return (
        <>
            <label style={{position:"absolute",width:"150px",height:"150px",borderRadius:"50%"}} htmlFor="profileEditImg"></label>
            <input
                hidden
                type="file"
                id="profileEditImg"
                accept="image/*"
                onChange={handleFileChange}
            />

            {/* 이미지 미리보기 */}
            <NewProfile alt="profileImage" src={mainImg} />

            <p style={{position:"absolute",right:"60px"}} onClick={handleUpload}>{selectedFile && `변경`}</p>
        </>
    )
};

const NewProfile = styled.img`
  width: 150px;
  height:150px;
  border-radius: 50%;
  border: 1px solid #e8e8e8;
  object-fit: cover;
`

export default ProfileImageFixComponent;
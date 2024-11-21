import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {FaPlus} from "react-icons/fa";

interface ImageComponentProps {
    setImg: (file: File | null) => void;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ setImg }) => {
    const [imgFile, setImgFile] = useState<File | null>();
    const [preview, setPreview] = useState<string | null>("");



// 2
    const onChangeImg = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files !== null) {
            const file = event.target.files[0];
            if (file && file.type.substring(0, 5) === "image") {
                setImgFile(file);
                setImg(file); // 부모 컴포넌트에 이미지 URL 전달
            } else {
                setImgFile(null);
            }
        }
    };

// 3
    useEffect(() => {
        if (imgFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(imgFile);
        } else {
            setPreview(null);
        }
    }, [imgFile]);

    return (
        <ImageUploadWrap>
            <ImageLabel htmlFor="uploadImg">
                <FaPlus />
                <PreviewImg src={preview as string} />
            </ImageLabel>

            <input
                id="uploadImg"
                name="img"
                type="file"
                accept="image/*"
                onChange={onChangeImg}
                style={{display:"none"}}
            />

        </ImageUploadWrap>
    );
};

const ImageUploadWrap = styled.div`
  width: 100%;
  position: relative;
`

const ImageLabel  =styled.label`
    width: 100px;
    height: 100px;
    border-radius: 20px;
    //border:1px solid  ;
    display: inline-block;
    text-align: center;
    line-height: 100px;
    font-size: 20px;
    position: relative;
    box-sizing: border-box;
`

const PreviewImg = styled.img`
  position: relative;
  left:0;
  top: 0;
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 20px;
  box-sizing: border-box;
  border:2px solid #e8e8e8;
`

export default ImageComponent;

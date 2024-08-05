import axios from "axios";

/**
 *
 * @param param:FormData
 * @return imgBB upload 이미지 url upload Fail -> 고정 upload 실패 url
 */
export async function uploadImage(param:FormData):Promise<string>{
    let result;
    try {
        const response = await axios.post('/api/auth/img/upload', param, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        result = response.data;
    }
    catch (error){
        console.log(`${error} imageUploadFail !!`);
        result = 'https://i.ibb.co/g3gyF8h/kuug.png';
    }
    return result;
}
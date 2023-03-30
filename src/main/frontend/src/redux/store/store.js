import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slice/userSlice'
import countReducer from '../slice/countSlice'

export default configureStore({
    reducer:{
        user: userReducer,
        count:countReducer
    }
})
//configureStore라는 친구가 reducer를 감싸고 있다.
// 그렇다. 저기서 모든 state를 관리할거라는 뜻이다.

//reducer가 비어있는데 저기다가 이제 상태관리할 것들 저장할거다.
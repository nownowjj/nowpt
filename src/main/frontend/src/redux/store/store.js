import {combineReducers, configureStore} from '@reduxjs/toolkit'
import userReducer from '../slice/userSlice'
import countReducer from '../slice/countSlice'
import productReducer from '../slice/productSlice'
import friendReducer from '../slice/friendSlice'
import storage from 'redux-persist/lib/storage';
import {persistReducer} from "redux-persist";


const reducers = combineReducers({
    user:userReducer,
    count:countReducer,
    product:productReducer,
    friend:friendReducer
})

const persistConfig = {
    key : 'root',
    storage ,
    whitelist : ['user'] // 해당 reducer만 저장
    // blacklist: [''] // 해당 reducer만 제외
}

const persistedReducer = persistReducer(persistConfig, reducers)

// export default reducers; // 기존 방식
export const store = configureStore({
    reducer: persistedReducer,
    // 다음이 middleware 추가 코드이다.
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
    // 기본 값이 true지만 배포할때 코드를 숨기기 위해서 false로 변환하기 쉽게 설정에 넣어놨다.
    devTools: true,
})

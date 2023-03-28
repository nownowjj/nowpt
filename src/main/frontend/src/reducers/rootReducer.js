// rootReducer.js

import {combineReducers} from 'redux';
import authReducer from "../actions/authActions";

const rootReducer = combineReducers({
// 애플리케이션의 전체 상태를 관리하는 rootReducer에서 authReducer를 포함시킵니다.
    auth: authReducer ,
});

export default rootReducer;
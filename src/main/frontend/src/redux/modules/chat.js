// 채팅 데이터를 처리하는 리덕스 모듈 파일.
import {createAction, handleActions} from 'redux-actions';

import {produce} from "immer";

// Actions
const GET_CHATROOM_INFO = 'GET_CHAT_ROOM_INFO';

// Action Creators
const getChatRoomInfo = createAction(GET_CHATROOM_INFO, (chatroom_info) => ({chatroom_info}));
// // const getChat = createAction('chat/GETCHAT');
// // const getMessages = createAction('chat/GETMESSAGES');
// // const setMessages = createAction('chat/SETMESSAGES');
// // const writeMessage = createAction('chat/WRITEMESSAGE');
// // const clearCurrentChat = createAction('chat/CLEARCURRENTCHAT');

// initialstate
const initialState = {
    // 채팅 리스트를 받는 배열.
    chat_info: [],
    receive_info: '',

    // 현재 접속 채팅방
    currentchat: {
        // roomId: null,
        // roomName: null,
        senderName: null,
        senderEmail: null,
        senderId: null,
        receiverName: null,
    },
//   // 현재 접속한 채팅 메시지
//   message: [],
//   messageText: null,
};

// const getChatRoom = (chatroom_info) => {
//   return function (dispatch, getState, {history}) {

//   }
// }


// 리듀서
export default handleActions(
    {
        [GET_CHATROOM_INFO]: (state, action) => produce(state, (draft) => {
            draft.currentchat = action.payload.chatroom_info;
        }),
    },
    initialState,
)


const actionCreators = {
    getChatRoomInfo,
};

export { actionCreators };
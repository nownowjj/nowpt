// 채팅 데이터를 처리하는 리덕스 모듈 파일.
// 이 파일로 채팅데이터를 서버와 주고 받으며,
// 리덕스에 데이터를 저장해 렌더링하면서 채팅을 화면에 보내준다.
import {createAction, handleActions} from "redux-actions";
import {produce} from "immer";
import axios from 'axios';
import {history} from "../configureStore";
import "moment";
import moment from "moment";


// Actions
// 댓글과는 달리 채팅 글귀는 삭제되거나 수정되지 않는다.
// 그래서 삭제, 수정하는 액션은 만들지 않음.
const SET_CHAT = "SET_CHAT";
const ADD_CHAT = "ADD_CHAT";
// const LOADING = "LOADING";

// Action Creators
const addChat = createAction(ADD_CHAT, (chat) => ({chat}));
const setChat = createAction(SET_CHAT, (chat_list) => ({chat_list}));
// const loading = createAction(LOADING, (chat) => ({chat}))

const initialState = {
    // 채팅 리스트를 받는 배열.
    list: {},
    // is_loading: false,
}

// 서버와 채팅 데이터를 주고 받는 미들웨어들
// 채팅한 서버로 보냄
const addChatAPI = (chat, id) => {
    return function (dispatch, getState) {
        console.log(chat);

        const formData = new FormData();
        formData.append('chat', chat.chat); //이름을 image가 아니라 file로 보내기?
        formData.append('title', chat.title);
        formData.append('price', chat.price);
        formData.append('content', chat.content);

        let _chat = {
            postId: post_id,
            username: chat.username,
            chat: chat.chat,
            myImg: chat.profileUrl,
            chatDt: moment().format('YYYY-MM-DD HH:mm:ss'),
        }
        console.log(_chat);

        axios.post("/chat", {
            ..._chat,
        })

            // axios.post(api/url,
            //   _작성자id, header_token,
            //   )
            //   .then((response) =>
            //     로그인한 사람(작성자 아님)의 메시지, email, 채팅방id, 작성자이름(해당 상세페이지 작성자))

            .then((response) => {
                console.log(response.data); // 바디로 오는 데이터
                let chat_list = {...chat, id: response.chat.id}
                dispatch(addChat(chat_list, chat_id))
            })
            .catch((error) => {
                console.log(error.response);
                window.alert("채팅 작성에 문제가 있습니다!")
            })
    }
}

// // 화면을 리로드를 했을 때 리덕스 store에 있는 정보들이 다 날아가기 때문에
// // 서버쪽 DB에 저장해뒀던 해당 게시물의 채팅 정보들을 response로 받아서
// // 다시 리덕스 store에 저장하고, 그것을 뷰에다 뿌려서 보여지게 합니다.
// const getChatAPI = (chat_id) => {
//   return function (dispatch, getState) {
//     return function (dispatch) {
//       if(!chat_id){
//         return;
//       }
//       console.log(chat_id);
//       axios.get(`/chat/${chat_id}`)
//     }
//   }
// }

// 리듀서
export default handleActions(
    {
        [ADD_CHAT]: (state, action) => produce(state, (draft) => {
            if(!draft.list[action.payload.chat_id]) {
                draft.list[action.payload.chat_id] = [action.payload.chat];
                return;
            }
            draft.list[action.payload.chat_id].unshift(action.payload.chat);
        }),

        [SET_CHAT]: (state, action) => produce(state, (draft) => {
            draft.list[action.payload.post_id] = action.payload.chat_list;
        }),

    },
    initialState
);

const actionCreators = {
    addChat,
    setChat,
    addChatAPI,
    getChatAPI,
};

export { actionCreators };
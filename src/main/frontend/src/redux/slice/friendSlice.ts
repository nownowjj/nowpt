import {createSlice} from "@reduxjs/toolkit";

interface FriendState{
    firstCount : number;
    secondCount : number;
    thirdCount : number;
    fourthCount : number;
    fiveCount : number;
    sixCount : number;
}

const initialState:FriendState ={
    firstCount : 0,
    secondCount : 0,
    thirdCount : 0,
    fourthCount : 0,
    fiveCount : 0,
    sixCount : 0,
};

const friendSlice = createSlice({
    name: "friendCount",
    initialState ,
    reducers:{
        firstEvent:(state)=>{ // 친구 요청 성공하면 , 보낸 요청 취소  (보낸 요청 , 친구 추천)
            console.log('firsEvent 실행');
            state.firstCount += 1;
        }
        ,
        secondEvent:(state)=>{ // 친구 삭제 (내 친구 , 친구 추천)
            state.secondCount += 1;
        }
        ,
        thirdEvent:(state)=>{ // 받은 요청 수락 (내 친구 , 받은 요청)
            state.thirdCount += 1;
        }
        ,
        fourthEvent:(state)=>{ // 받은 요청을 거절 할 때 (받은 요청 , 친구 추천)
            state.fourthCount += 1;
        }
        ,
        fiveEvent:(state)=>{ // 친구 요청을 보낼 때 상대방이 먼저 요청을 보냈을 경우 (내 친구 , 받은 요청 , 친구 추천)
            console.log('fiveEvent 실행');
            state.fiveCount += 1;
        }
        ,
        sixEvent:(state)=>{ // 친구 요청을 보낼 때 상대방이 먼저 요청을 보냈을 경우 (내 친구 , 받은 요청 , 친구 추천)
            console.log('fiveEvent 실행');
            state.sixCount += 1;
        }
    },
});

export const {firstEvent , secondEvent , thirdEvent ,fourthEvent ,fiveEvent,sixEvent} = friendSlice.actions;

export default friendSlice.reducer;
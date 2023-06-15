import React, {useCallback, useEffect, useRef, useState} from 'react';
import {createGlobalStyle} from 'styled-components';
import reset from 'styled-reset';
import "../../styles/scss/chat.css"
import {getMembInfo} from "../../api/Api";


const Chat = () => {
    const [membInfo, setMembInfo] = useState([""]);

    const [msg, setMsg] = useState("");
    const [name, setName] = useState("");
    const [chatt, setChatt] = useState([]);
    const [chkLog, setChkLog] = useState(false);
    const [socketData, setSocketData] = useState();

    const ws = useRef(null);    //webSocket을 담는 변수,
                                //컴포넌트가 변경될 때 객체가 유지되어야하므로 'ref'로 저장

    const msgBox = chatt.map((item, idx) => (
        <div key={idx} className={item.name === name ? 'me' : 'other'}>
            <span><b>{item.name}</b></span> [ {item.date} ]<br/>
            <span>{item.msg}</span>
        </div>
    ));

    useEffect(() => {

        if(socketData !== undefined) {
            const tempData = chatt.concat(socketData);
            console.log(tempData);
            setChatt(tempData);
        }


    }, [socketData]);

    useEffect(()=>{
        getMembInfo()
            .then(response => {
                // console.log("myPage")
                console.log('Response Object is: %O', response)
                setMembInfo(response);
            })
            .catch(error => {
                console.log(error);
            })
    },[])

    const GlobalStyle = createGlobalStyle`  //css 초기화가 된 component
        ${reset}
        
    `;


    //webSocket
    //webSocket
    //webSocket
    //webSocket
    //webSocket
    //webSocket
    const onText = event => {
        console.log(event.target.value);
        setMsg(event.target.value);
    }


    const webSocketLogin = useCallback(() => {
        ws.current = new WebSocket("ws://192.168.10.215:8060/socket/chatt");


        ws.current.onmessage = (message) => {
            const dataSet = JSON.parse(message.data);

            setSocketData(dataSet);
        }
    });


    const send = useCallback(() => {
        if(!chkLog) {
            if(name === "") {
                alert("이름을 입력하세요.");
                document.getElementById("name").focus();
                return;
            }
            webSocketLogin();
            setChkLog(true);
        }

        if(msg !== ''){
            const data = {
                name,
                msg,
                date: new Date().toLocaleString(),
            };  //전송 데이터(JSON)

            const temp = JSON.stringify(data);

            if(ws.current.readyState === 0) {   //readyState는 웹 소켓 연결 상태를 나타냄
                ws.current.onopen = () => { //webSocket이 맺어지고 난 후, 실행
                    console.log(ws.current.readyState);
                    ws.current.send(temp);
                }
            }else {
                ws.current.send(temp);
            }
        }else {
            alert("메세지를 입력하세요.");
            document.getElementById("msg").focus();
            return;
        }
        setMsg("");
    });
    //webSocket
    //webSocket
    //webSocket
    //webSocket
    //webSocket
    //webSocket



    return (
        <>
            {/*<GlobalStyle/>*/}
            <div id="chat-wrap">
                <div id='chatt'>
                    <h1 id="title">WebSocket Chatting</h1>
                    <h4 id="conState" style={{textAlign:"center"}}>{chkLog}</h4>
                    <br/>
                    <div id='talk'>
                        <div className='talk-shadow'></div>
                        {msgBox}
                    </div>
                    <p>{membInfo.membNm}</p>
                    <input disabled={chkLog}
                           placeholder='이름을 입력하세요.'
                           type='text'
                           id='name'
                           value={name}
                           onChange={(event => setName(event.target.value))}/>
                    <div id='sendZone'>
                        <textarea id='msg' value={msg} onChange={onText}
                                  onKeyDown={(ev) => {if(ev.keyCode === 13){send();}}}></textarea>
                        <input type='button' value='전송' id='btnSend' onClick={send}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Chat;
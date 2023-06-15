// import React, { useState, useEffect } from 'react';
// import Stomp from 'stompjs';
// import SockJS from 'sockjs-client';
//
// const Chat = () => {
//     const [stompClient, setStompClient] = useState(null);
//     const [chatMessages, setChatMessages] = useState([]);
//     const [messageInput, setMessageInput] = useState('');
//     const [username, setUsername] = useState('');
//
//     useEffect(() => {
//         connect();
//         return () => {
//             disconnect();
//         };
//     }, []);
//
//     const connect = () => {
//         const socket = new WebSocket('ws://localhost:8060/ws');
//
//         // Save the WebSocket connection in state
//         // setWebSocket(socket);
//
//         // ws.current = new WebSocket("ws://192.168.10.215:8060/socket/chatt");
//         // const socket = new SockJS('ws://localhost:8060/ws');
//         const client = Stomp.over(socket);
//         client.connect({}, onConnected, onError);
//         setStompClient(client);
//     };
//
//     const disconnect = () => {
//         if (stompClient) {
//             stompClient.disconnect();
//         }
//     };
//
//     const onConnected = () => {
//         stompClient.subscribe('/topic/public', onMessageReceived);
//         stompClient.send('/app/chat.addUser', {}, JSON.stringify({ sender: username }));
//     };
//
//     const onError = (error) => {
//         console.log('Error connecting to WebSocket:', error);
//     };
//
//     const onMessageReceived = (payload) => {
//         const message = JSON.parse(payload.body);
//         setChatMessages((prevMessages) => [...prevMessages, message]);
//     };
//
//     const handleInputChange = (event) => {
//         setMessageInput(event.target.value);
//     };
//
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         if (stompClient && messageInput.trim() !== '') {
//             const message = {
//                 content: messageInput,
//                 sender: username,
//             };
//             stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(message));
//             setMessageInput('');
//         }
//     };
//
//     return (
//         <div>
//             <div>
//                 <h2>Chat</h2>
//                 <ul>
//                     {chatMessages.map((message, index) => (
//                         <li key={index}>
//                             {message.sender}: {message.content}
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     placeholder="Your message"
//                     value={messageInput}
//                     onChange={handleInputChange}
//                 />
//                 <button type="submit">Send</button>
//             </form>
//         </div>
//     );
// };
//
// export default Chat;
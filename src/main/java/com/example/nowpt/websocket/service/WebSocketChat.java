package com.example.nowpt.websocket.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.*;

@Service
@ServerEndpoint("/socket/chatt")
@Slf4j
public class WebSocketChat {



    private static List<Session> sessionUsers = Collections.synchronizedList(new ArrayList<>());
//    private static Set<Session> sessionUsers = Collections.synchronizedSet(new HashSet<Session>());
//    private static Logger logger = (Logger) LoggerFactory.getLogger(WebSocketChat.class);



    @OnOpen
    public void onOpen(Session session) {
        log.info("open session : {}, sessionUsers={}", session.toString(), sessionUsers);


        if(!sessionUsers.contains(session)) {
            sessionUsers.add(session);
            log.info("session open : {}", session);
        }else{
            log.info("이미 연결된 session");
        }
    }

    @OnMessage
    public void onMessage(String message, Session session) throws IOException {
        log.info("receive message : {}", message);
        log.info("size : {}", sessionUsers.size());
        log.info("message는 :  {}",message);

        int size = sessionUsers.size();

        for (Session s : sessionUsers) {
            log.info("send data : {}", message);

            s.getBasicRemote().sendText(message);
        }
    }

    @OnClose
    public void onClose(Session session) {
        log.info("session close : {}", session);
        sessionUsers.remove(session);
    }
}
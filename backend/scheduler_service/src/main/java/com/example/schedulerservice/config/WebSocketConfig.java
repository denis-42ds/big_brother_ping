package com.example.schedulerservice.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/status-of-servers"); // путь куда будут отправляться сообщения
        config.setApplicationDestinationPrefixes("/scheduler-service-app"); // префикс сообщений от приложения
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/serv-stat").withSockJS(); // точка подключения клиента
    }

//    Подключитесь к WebSocket на стороне фронта (пример на JavaScript):
//    const socket = new SockJS('/serv-stat');
//const stompClient = Stomp.over(socket);
//
//stompClient.connect({}, function(frame) {
//        console.log('Connected to websocket!');
//        stompClient.subscribe('/status-of-servers/server-status-updates', function(message) {
//        const data = JSON.parse(message.body);
//            updateUI(data); // обновить интерфейс согласно новым данным
//        });
//    });

}

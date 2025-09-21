package com.example.schedulerservice.config;

import com.example.schedulerservice.model.entity.ServerStatusLog;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.telegram.telegrambots.longpolling.util.LongPollingSingleThreadUpdateConsumer;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;
import org.telegram.telegrambots.meta.generics.TelegramClient;

import java.util.List;
import java.util.Objects;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicInteger;

import static com.example.schedulerservice.utils.FormMessage.createMessage;
@Slf4j
@Component
@RequiredArgsConstructor
public class UpdateConsumer implements LongPollingSingleThreadUpdateConsumer {

    private final TelegramClient telegramClient;

    private CopyOnWriteArrayList<String> consumerChatIdList = new CopyOnWriteArrayList<>();

    public void sendMessage(List<ServerStatusLog> serverAlertList, AtomicInteger fixedRate, int timeout) {

        if (!consumerChatIdList.isEmpty()) {
            String message = createMessage(serverAlertList, fixedRate, timeout);
            for (String chatId : consumerChatIdList) {
                SendMessage sendMessage = SendMessage.builder()
                        .text(message)
                        .chatId(chatId)
                        .build();
                try {
                    telegramClient.execute(sendMessage);
                } catch (TelegramApiException e) {
                    throw new RuntimeException(e);
                }
                log.info("send message to client");
            }
        }
    }

    @Override
    public void consume(Update update) {

        if (Objects.equals(update.getMessage().getText(), "/add")) {

            consumerChatIdList.add(update.getMessage().getChatId().toString());
            update.getMessage().getText();
            update.getMessage().getChatId();
            SendMessage sendMessage = SendMessage.builder()
                    .text("Теперь вы будете получать сообщения о состоянии серверов")
                    .chatId(update.getMessage().getChatId())
                    .build();


            try {
                telegramClient.execute(sendMessage);
            } catch (TelegramApiException e) {
                throw new RuntimeException(e);
            }
            log.info("add client into subscriber list");
        }
        if (Objects.equals(update.getMessage().getText(), "/clean")) {
            System.out.println("-------------------");
            SendMessage sendDeleteMessage = SendMessage.builder()
                    .text("Список получателей очищен")
                    .chatId(update.getMessage().getChatId())
                    .build();
            consumerChatIdList.clear();

            try {
                telegramClient.execute(sendDeleteMessage);
            } catch (TelegramApiException e) {
                throw new RuntimeException(e);
            }

            log.info("clean subscriber list");
        }
    }
}

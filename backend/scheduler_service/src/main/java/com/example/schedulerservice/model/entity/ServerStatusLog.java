package com.example.schedulerservice.model.entity;


import com.example.schedulerservice.model.constant.ServerStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.UUID;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "server_status_log")
public class ServerStatusLog {

    @Id
    @Column(name = "server_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    UUID serverId;

    @Column(name = "server_url", nullable = false)
    String serverUrl;

    @Column(name = "server_name", nullable = false)
    String serverName;

    @Column(name = "local_date_time")
    LocalDateTime localDateTime;

    @Column(name = "response_code")
    String responseCode;

    @Column(name = "latency")
    String latency;

    @Column(name = "server_status")
    @Enumerated(EnumType.STRING)
    ServerStatus serverStatus;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ServerStatusLog that)) return false;
        return Objects.equals(getServerUrl(), that.getServerUrl()) && Objects.equals(getServerName(), that.getServerName());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getServerUrl(), getServerName());
    }

}

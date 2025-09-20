package com.example.schedulerservice.model.entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Getter
@Setter
@Table(name = "server")
public class Server {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "server_id", nullable = false)
    UUID serverId;

    @Column(name = "server_url", nullable = false)
    String serverUrl;

    @Column(name = "server_name", nullable = false)
    String serverName;
}

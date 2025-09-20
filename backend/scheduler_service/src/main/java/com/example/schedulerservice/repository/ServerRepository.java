package com.example.schedulerservice.repository;



import com.example.schedulerservice.model.entity.Server;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ServerRepository extends JpaRepository<Server, UUID> {
    @Cacheable("server")
    Optional<Server> findByServerUrl(String serverUrl);
    @Cacheable("server")
    Optional<Server> findByServerName(String serverName);
}

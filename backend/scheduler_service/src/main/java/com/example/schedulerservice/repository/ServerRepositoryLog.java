package com.example.schedulerservice.repository;


import com.example.schedulerservice.model.entity.ServerStatusLog;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.UUID;

public interface ServerRepositoryLog extends JpaRepository<ServerStatusLog, UUID> {

    @Cacheable("serverLog")
    @Query("""
            SELECT ssl
            FROM ServerStatusLog ssl
            WHERE ssl.localDateTime >= :fromTimeStamp
            AND   ssl.localDateTime <= :toTimeStamp
            """)
    Page<ServerStatusLog> getServerDataAll(@Param("fromTimeStamp") LocalDateTime fromTimeStamp,
                                           @Param("toTimeStamp") LocalDateTime toTimeStamp,
                                           Pageable pageable);



    @Query("""
            SELECT ssl
            FROM ServerStatusLog ssl
            WHERE ssl.localDateTime >= :fromTimeStamp
            AND   ssl.localDateTime <= :toTimeStamp
            AND   ssl.serverName = :serverName
            """)
    Page<ServerStatusLog> getServerDataByName(@Param("fromTimeStamp") LocalDateTime fromTimeStamp,
                                              @Param("toTimeStamp") LocalDateTime toTimeStamp,
                                              @Param("serverName") String serverName,
                                              Pageable pageable);


    @Query("""
            SELECT ssl
            FROM ServerStatusLog ssl
            WHERE ssl.localDateTime >= :fromTimeStamp
            AND   ssl.localDateTime <= :toTimeStamp
            AND   ssl.serverUrl = :serverUrl
            """)
    Page<ServerStatusLog> getServerDataByUrl(@Param("fromTimeStamp") LocalDateTime fromTimeStamp,
                                             @Param("toTimeStamp") LocalDateTime toTimeStamp,
                                             @Param("serverUrl") String serverUrl,
                                             Pageable pageable);


    @Query("""
            SELECT ssl
            FROM ServerStatusLog ssl
            WHERE ssl.localDateTime >= :fromTimeStamp
            AND   ssl.localDateTime <= :toTimeStamp
            AND   ssl.serverStatus = :serverStatus
            """)
    Page<ServerStatusLog> getServerDataByServerStatus(@Param("fromTimeStamp") LocalDateTime fromTimeStamp,
                                                      @Param("toTimeStamp") LocalDateTime toTimeStamp,
                                                      @Param("serverUrl") String serverStatus,
                                                      Pageable pageable);
    @Query("""
                       DELETE
                       FROM ServerStatusLog ssl
                       WHERE ssl.localDateTime >= :fromTimeStamp
                       AND   ssl.localDateTime <= :toTimeStamp
            """)
    void deleteLogs(@Param("fromTimeStamp") LocalDateTime fromTimeStamp,
                    @Param("toTimeStamp") LocalDateTime toTimeStamp);
}

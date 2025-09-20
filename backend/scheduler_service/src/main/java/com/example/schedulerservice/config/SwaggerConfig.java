package com.example.schedulerservice.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
                .group("Scheduler-service")
                .pathsToMatch("/server-status/**")
                .build();
    }

    @Bean
    public OpenAPI customOpenApi(
            @Value("${spring.application.name}") String appName,
            @Value("${info.app.description}") String appDescription,
            @Value("${info.app.version}") String appVersion,
            @Value("${info.app.summary}") String appSummary) {

        return new OpenAPI()
                .info(new Info()
                        .title(appName)
                        .description(appDescription)
                        .version(appVersion)
                        .summary(appSummary));
    }
}

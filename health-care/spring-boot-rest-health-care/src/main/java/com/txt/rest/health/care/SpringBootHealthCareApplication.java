package com.txt.rest.health.care;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@Slf4j
@EnableAsync
public class SpringBootHealthCareApplication {

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(SpringBootHealthCareApplication.class);
        Environment env = app.run(args).getEnvironment();
        log.info(
                "\n----------------------------------------------------------\n\t"
                        + "Application '{}' is running!\n\t"
                        + "Profile(s): \t{}\n\t"
                        + "Port: \t{}\n----------------------------------------------------------",
                env.getProperty("spring.application.name"),
                env.getActiveProfiles(),
                env.getProperty("server.port")
        );
    }
}

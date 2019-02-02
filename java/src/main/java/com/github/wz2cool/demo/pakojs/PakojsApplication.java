package com.github.wz2cool.demo.pakojs;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
public class PakojsApplication {

    public static void main(String[] args) {
        SpringApplication.run(PakojsApplication.class, args);
    }

}


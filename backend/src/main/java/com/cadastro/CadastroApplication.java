package com.cadastro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration; // Adicione este import

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class}) // Adicione o 'exclude'
public class CadastroApplication extends SpringBootServletInitializer {
    
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(CadastroApplication.class);
    }
    
    public static void main(String[] args) {
        SpringApplication.run(CadastroApplication.class, args);
    }
}
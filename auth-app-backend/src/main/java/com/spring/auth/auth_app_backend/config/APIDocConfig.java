package com.spring.auth.auth_app_backend.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
       info= @Info(
                title = "Auth Application build by Aditya.",
                description = "Generic Auth app that can be used with any application",
                contact = @Contact(
                        name="Aditya Chourasiya",
                        url="https://aditya.com",
                        email = "suspportaaadi0@gmail.com"
                ),
                version = "1.0",
                summary = "This app is very useful if you dont want to create auth app from scratch."
        ),
        security = {
               @SecurityRequirement(
                       name = "bearerAuth"
               )
        }
)

@SecurityScheme(
        name="bearerAuth",
        type = SecuritySchemeType.HTTP,
        scheme = "bearer",  //AuthorizzTION: BEARER TOKEN SE HOGA
        bearerFormat = "JWT"
)
public class APIDocConfig {
}

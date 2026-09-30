package com.spring.auth.auth_app_backend.dtos;


import jakarta.persistence.Column;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class RoleDto {
    private UUID id=UUID.randomUUID();
     private String name;
}

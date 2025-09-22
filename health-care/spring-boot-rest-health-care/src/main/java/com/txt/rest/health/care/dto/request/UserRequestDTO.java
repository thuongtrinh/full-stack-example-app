package com.txt.rest.health.care.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.apache.commons.lang3.builder.ReflectionToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRequestDTO {

    @NotEmpty
    private String firstName;

    @NotEmpty
    private String lastName;

    @NotEmpty
    @Email
    private String email;

    @NotNull
    private String password;

    @NotEmpty
    private String address;

    // Optional
    private String phoneNumber;
    private String gender;
    private String role;
    private String position;

    @Override
    public String toString() {
        return ReflectionToStringBuilder.toString(this, ToStringStyle.JSON_STYLE);
    }
}

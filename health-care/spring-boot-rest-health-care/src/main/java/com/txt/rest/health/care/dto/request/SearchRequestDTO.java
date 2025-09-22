package com.txt.rest.health.care.dto.request;

import lombok.*;
import org.apache.commons.lang3.builder.ReflectionToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchRequestDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String address;
    private String phoneNumber;
    private String gender;
    private String role;
    private String position;

    @Override
    public String toString() {
        return ReflectionToStringBuilder.toString(this, ToStringStyle.JSON_STYLE);
    }
}

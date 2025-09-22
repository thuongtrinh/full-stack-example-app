package com.txt.rest.health.care.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.builder.ReflectionToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingAppointmentDTO {

    @NotNull
    private Long doctorId;

    @NotEmpty
    @Email
    private String email;

    @NotEmpty
    private String fullName;

    @NotEmpty
    private String phoneNumber;

    @NotEmpty
    private String address;

    @NotNull
    private LocalDate date;

    @NotEmpty
    private String timeKey;

    @NotEmpty
    private String gender;

    @NotNull
    private String language;

    private String reason;
    private String birthday;

    @Override
    public String toString() {
        return ReflectionToStringBuilder.toString(this, ToStringStyle.JSON_STYLE);
    }
}

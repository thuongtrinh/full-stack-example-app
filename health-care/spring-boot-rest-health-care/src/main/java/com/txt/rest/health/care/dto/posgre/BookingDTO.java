package com.txt.rest.health.care.dto.posgre;

import com.txt.rest.health.care.dto.common.BaseDTO;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = true)
public class BookingDTO extends BaseDTO<Long> implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long doctorId;
    private Long patientId;
    private String statusKey;
    private String timeKey;
    private LocalDate date;
    private String token;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
    private UsersDTO userDoctor;
    private UsersDTO userPatient;
    private AllCodeDTO allCodeTime;
    private AllCodeDTO allCodeStatus;
}

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
public class ScheduleDTO extends BaseDTO<Long> implements Serializable {

    private static final long serialVersionUID = 1L;


    private Integer doctorId;
    private LocalDate date;
    private String timeKey;
    private Integer currentNumber;
    private Integer maxNumber;
    private AllCodeDTO allCodeTime;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
}

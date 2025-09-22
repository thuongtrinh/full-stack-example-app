package com.txt.rest.health.care.dto.posgre;

import com.txt.rest.health.care.dto.common.BaseDTO;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = true)
public class HistoryDTO extends BaseDTO<Long> implements Serializable {

    private static final long serialVersionUID = 1L;

    private Integer patientId;
    private Integer doctorId;
    private String description;
    private String files;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
}

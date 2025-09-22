package com.txt.rest.health.care.dto.posgre;

import com.txt.rest.health.care.dto.common.BaseDTO;
import lombok.*;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = true)
public class ProfileDTO extends BaseDTO<Long> implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long doctorId;
    private String firstName;
    private String lastName;
    private String description;
    private AllCodeDTO price;
    private AllCodeDTO role;
}

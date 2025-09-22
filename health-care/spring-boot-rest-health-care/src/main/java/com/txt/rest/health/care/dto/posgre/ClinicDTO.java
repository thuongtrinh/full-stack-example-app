package com.txt.rest.health.care.dto.posgre;

import com.txt.rest.health.care.dto.common.BaseDTO;
import lombok.*;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = true)
public class ClinicDTO extends BaseDTO<Long> implements Serializable {

    private static final long serialVersionUID = 1L;

    private String name;
    private String address;
    private String description;
    private String image;
}

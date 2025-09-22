package com.txt.rest.health.care.dto.posgre;

import com.txt.rest.health.care.dto.common.BaseDTO;
import lombok.*;
import org.apache.commons.lang3.builder.ReflectionToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = true)
public class DoctorDTO extends BaseDTO<Long> implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    private Long doctorId;
    private String priceKey;
    private String provinceKey;
    private String paymentKey;
    private String addressClinic;
    private String nameClinic;
    private String note;
    private Integer count;
    private AllCodeDTO price;
    private AllCodeDTO province;
    private AllCodeDTO payment;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;

    @Override
    public String toString() {
        return ReflectionToStringBuilder.toString(this, ToStringStyle.JSON_STYLE);
    }
}

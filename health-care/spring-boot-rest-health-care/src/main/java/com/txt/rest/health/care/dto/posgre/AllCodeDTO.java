package com.txt.rest.health.care.dto.posgre;

import lombok.*;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AllCodeDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private String key;
    private String type;
    private String valueEn;
    private String valueVi;
}

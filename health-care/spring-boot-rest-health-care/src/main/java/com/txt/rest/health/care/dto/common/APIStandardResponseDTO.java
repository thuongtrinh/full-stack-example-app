package com.txt.rest.health.care.dto.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

@AllArgsConstructor
@ToString
@Data
@Builder
public class APIStandardResponseDTO<T> implements Serializable {

    private static final long serialVersionUID = 1L;

    private String status = "SUCCESS";
    private String exchangeId;
    private T data;
    private ResponseStatus responseStatus;

    public APIStandardResponseDTO() {
        this.setResponseStatus(null);
    }
}

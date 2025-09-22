package com.txt.rest.health.care.dto.common;

import jakarta.validation.Valid;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class APIStandardRequestDTO<T> extends RequestDTO {
    private static final long serialVersionUID = 1L;

    @Valid
    private T data;
}

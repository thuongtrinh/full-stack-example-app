package com.txt.rest.health.care.dto.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public abstract class BaseDTO <ID> {
    private ID id;
}

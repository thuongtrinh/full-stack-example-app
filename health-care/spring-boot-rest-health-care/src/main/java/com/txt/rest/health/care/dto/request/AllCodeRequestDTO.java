package com.txt.rest.health.care.dto.request;

import lombok.*;
import org.apache.commons.lang3.builder.ReflectionToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import java.io.Serializable;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AllCodeRequestDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    @NonNull
    private List<String> types;

    @Override
    public String toString() {
        return ReflectionToStringBuilder.toString(this, ToStringStyle.JSON_STYLE);
    }
}

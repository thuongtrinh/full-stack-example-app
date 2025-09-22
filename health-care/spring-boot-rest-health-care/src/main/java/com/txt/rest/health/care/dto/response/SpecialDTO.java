package com.txt.rest.health.care.dto.response;

import com.txt.rest.health.care.dto.posgre.MarkdownDTO;
import com.txt.rest.health.care.dto.posgre.UsersDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.builder.ReflectionToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SpecialDTO {
    private UsersDTO intro;
    private MarkdownDTO detail;

    @Override
    public String toString() {
        return ReflectionToStringBuilder.toString(this, ToStringStyle.JSON_STYLE);
    }
}

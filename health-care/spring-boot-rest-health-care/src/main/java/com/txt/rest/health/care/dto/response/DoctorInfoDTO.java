package com.txt.rest.health.care.dto.response;

import com.txt.rest.health.care.dto.posgre.DoctorDTO;
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
public class DoctorInfoDTO {
    private UsersDTO intro;
    private MarkdownDTO detail;
    private DoctorDTO doctor;

    @Override
    public String toString() {
        return ReflectionToStringBuilder.toString(this, ToStringStyle.JSON_STYLE);
    }
}

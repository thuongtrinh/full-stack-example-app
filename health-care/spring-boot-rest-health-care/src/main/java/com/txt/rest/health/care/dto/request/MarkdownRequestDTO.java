package com.txt.rest.health.care.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
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
public class MarkdownRequestDTO {

    private Long id;

    @NotNull
    private Long doctorId;

    @NotNull
    private Long clinicId;

    @NotNull
    private Long specialityId;

    @NotEmpty
    private String contentHtml;

    @NotEmpty
    private String contentMarkdown;

    @NotEmpty
    private String description;

    @Override
    public String toString() {
        return ReflectionToStringBuilder.toString(this, ToStringStyle.JSON_STYLE);
    }
}

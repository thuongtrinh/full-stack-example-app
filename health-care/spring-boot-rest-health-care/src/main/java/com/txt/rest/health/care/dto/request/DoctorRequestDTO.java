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
public class DoctorRequestDTO {

//    @NotNull
//    private Long markdownId;

    @NotNull
    private Long doctorId;

    // Markdown
    @NotEmpty
    private String contentHtml;

    @NotEmpty
    private String contentMarkdown;

    @NotEmpty
    private String description;

    // Doctor info
    @NotEmpty
    private String priceKey;

    @NotEmpty
    private String provinceKey;

    @NotEmpty
    private String paymentKey;

    @NotEmpty
    private String addressClinic;

    @NotEmpty
    private String nameClinic;

    @NotEmpty
    private String note;

    @Override
    public String toString() {
        return ReflectionToStringBuilder.toString(this, ToStringStyle.JSON_STYLE);
    }
}

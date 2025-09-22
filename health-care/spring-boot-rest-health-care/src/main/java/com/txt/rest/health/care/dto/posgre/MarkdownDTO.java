package com.txt.rest.health.care.dto.posgre;

import com.txt.rest.health.care.dto.common.BaseDTO;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = true)
public class MarkdownDTO extends BaseDTO<Long> implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long doctorId;
    private Long clinicId;
    private Long specialityId;
    private String contentHtml;
    private String contentMarkdown;
    private String description;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
}

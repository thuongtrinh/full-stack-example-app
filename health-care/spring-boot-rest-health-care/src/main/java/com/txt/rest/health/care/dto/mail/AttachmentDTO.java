package com.txt.rest.health.care.dto.mail;

import lombok.Data;

@Data
public class AttachmentDTO {
    private String code = "";
    private String type = "";
    private String system = "";
    private String contentType = "";
    private String displayName = "";
}

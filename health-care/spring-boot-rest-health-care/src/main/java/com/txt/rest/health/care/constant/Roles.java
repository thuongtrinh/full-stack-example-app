package com.txt.rest.health.care.constant;

import com.txt.rest.health.care.dto.common.ResponseCode;
import org.apache.commons.lang3.StringUtils;

public enum Roles {

    ADMIN("R1", "ADMIN"),
    USER("R2", "USER"),
    STAFF("R3", "STAFF");

    private final String code;
    private final String name;

    Roles(String code, String name) {
        this.code = code;
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public String getName() {
        return name;
    }

    public static Roles getRoles(String code) {
        if (StringUtils.isBlank(code)) {
            return null;
        }
        for (Roles e : Roles.values()) {
            if (code.equalsIgnoreCase(e.code)) {
                return e;
            }
        }
        return null;
    }
}
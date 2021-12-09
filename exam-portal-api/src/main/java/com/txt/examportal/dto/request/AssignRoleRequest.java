package com.txt.examportal.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AssignRoleRequest implements Serializable {

    Long userId;
    Long roleId;
}

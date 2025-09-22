package com.txt.rest.health.care.dto.posgre;

import com.txt.rest.health.care.dto.common.BaseDTO;
import lombok.*;
import org.apache.commons.lang3.builder.ReflectionToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = true)
public class UsersDTO extends BaseDTO<Long> implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String address;
    private String phoneNumber;
    private String gender;
    private String image;
    private String roleKey;
    private String positionKey;
    private AllCodeDTO position;
    private AllCodeDTO role;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;

    @Override
    public String toString() {
        return ReflectionToStringBuilder.toString(this, ToStringStyle.JSON_STYLE);
    }
}

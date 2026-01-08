package com.txt.noteapp.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TokenResponse {

    private String kind;
    private String localId;
    private String email;
    private String displayName;
    private String idToken;
    private Boolean registered;
    private String refreshToken;
    private String expiresIn;
}

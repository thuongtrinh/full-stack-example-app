package com.txt.rest.health.care.service.auth;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;

@Service
@Slf4j
public class JwtService {
    public static final String BEARER = "Bearer ";
    public static final String CLAIM_NAME = "preferred_username";
    public static final String AUTHORIZATION = "Authorization";
    public static final String ROLE_USER = "ROLE_USER";

    private static final String SECRET = "5367566859703373367639792F423F452848284D6251655468576D5A71347437";
    private static final String ISSUER = "ISSUER_HEALTH_CARE";
    private static final String SUBJECT = "HEALTH_CARE";
    private static final long TOKEN_VALIDITY_IN_MILLIS = 1800000000L;

    private static Algorithm algorithm;
    private static JWTVerifier verifier;

    public JwtService() {
        initialize();
    }

    public static void initialize() {
        algorithm = Algorithm.HMAC256(SECRET);
        verifier = JWT.require(algorithm)
                .withIssuer(ISSUER)
                .build();
    }

    public static String generateToken(String email) {
        String jwtToken = JWT.create()
                .withIssuer(ISSUER)
                .withSubject(SUBJECT)
                .withClaim(CLAIM_NAME, email)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + TOKEN_VALIDITY_IN_MILLIS))
                .withJWTId(UUID.randomUUID().toString())
                .withNotBefore(new Date(System.currentTimeMillis() + 1000L))
                .sign(algorithm);

        return jwtToken;
    }

    public static DecodedJWT verifyJWT(String jwtToken) {
        try {
            DecodedJWT decodedJWT = verifier.verify(jwtToken);
            return decodedJWT;
        } catch (JWTVerificationException e) {
            log.error("JWT verification failed {}", e);
        }
        return null;
    }

    public static DecodedJWT decodedJWT(String jwtToken) {
        try {
            DecodedJWT decodedJWT = JWT.decode(jwtToken);
            return decodedJWT;
        } catch (JWTDecodeException e) {
            log.error("JWT decode exception {}", e);
        }
        return null;
    }

    public static boolean isJWTExpired(DecodedJWT decodedJWT) {
        Date expiresAt = decodedJWT.getExpiresAt();
        return expiresAt.before(new Date());
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = getUsername(token);
        return (username.equals(userDetails.getUsername()) && !isJWTExpired(decodedJWT(token)));
    }

    public static String getUsername(String bearerToken) {
        DecodedJWT jwt = JWT.decode(getJWTToken(bearerToken));
        log.info("Get claim - Token decryption: {}", jwt.getClaims());
        Claim mailClaim = jwt.getClaims().get(CLAIM_NAME);
        return mailClaim != null ? mailClaim.asString() : null;
    }

    public static String getJWTToken(String bearerToken) {
        String jwtToken = bearerToken.replace(BEARER, "");
        return jwtToken;
    }
}

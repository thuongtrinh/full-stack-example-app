package com.txt.noteapp.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.InputStream;

@Configuration
public class FirebaseConfig {

    @Bean
    public FirebaseAuth firebaseAuth() throws Exception {
//        String base64EncodedServiceAccountKey = serviceAccountKey;
//        InputStream credentialsStream = new ByteArrayInputStream(Base64.getDecoder().decode(base64EncodedServiceAccountKey));
        InputStream credentialsStream = FirebaseConfig.class.getResourceAsStream("/react-app-tx-firebase-adminsdk-fbsvc-f24bebea4c.json");

        GoogleCredentials credentials = GoogleCredentials.fromStream(credentialsStream);
        FirebaseOptions options =
                FirebaseOptions.builder()
//                        .setCredentials(GoogleCredentials.fromStream(credentialsStream))
                        .setCredentials(credentials)
                        .build();
        if (FirebaseApp.getApps().isEmpty()) {
            FirebaseApp.initializeApp(options);
        }
        return FirebaseAuth.getInstance();
    }
}
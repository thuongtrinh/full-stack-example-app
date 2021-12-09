package com.txt.examportal.utils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.txt.examportal.model.Role;
import com.txt.examportal.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;

public class FileUtils {

    @Autowired
    private static ObjectMapper mapper = new ObjectMapper();

    public static List<User> readUserJsonFile() throws IOException {
        List<User> pp3 = null;
        try {
            File jsonFile = new ClassPathResource("data/users_exam.json").getFile();

            // 1. convert JSON array to Array objects
//            User[] pp1 = mapper.readValue(jsonFile, User[].class);
//            System.out.println("JSON array to Array objects...");
//            for (User person : pp1) {
//                System.out.println(person);
//            }

            // 2. convert JSON array to List of objects
//            List<User> ppl2 = Arrays.asList(mapper.readValue(jsonFile, User[].class));
//            System.out.println("\nJSON array to List of objects");
//            ppl2.stream().forEach(x -> System.out.println(x));

            // 3. alternative
            pp3 = mapper.readValue(jsonFile, new TypeReference<List<User>>() {});
//            System.out.println("\nAlternative...");
//            pp3.stream().forEach(x -> System.out.println(x));
        } catch (IOException e) {
            e.printStackTrace();
        }

        return pp3;
    }

    public static List<Role> readRoleJsonFile() throws IOException {
        List<Role> ppl2 = null;
        try {
            File jsonFile = new ClassPathResource("data/roles_exam.json").getFile();

            // 2. convert JSON array to List of objects
            ppl2 = Arrays.asList(mapper.readValue(jsonFile, Role[].class));
        } catch (IOException e) {
            e.printStackTrace();
        }

        return ppl2;
    }

}

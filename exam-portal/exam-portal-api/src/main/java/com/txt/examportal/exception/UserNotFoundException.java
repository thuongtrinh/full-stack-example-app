package com.txt.examportal.exception;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException() {
        super("User with this username not found in Database");
    }

    public UserNotFoundException(String message) {
        super(message);
    }
}

package com.txt.examportal.exception;

public class UserFoundException extends RuntimeException {

    public UserFoundException() {
        super("User with this username is already there in DB !! try with another one");
    }

    public UserFoundException(String message) {
        super(message);
    }
}

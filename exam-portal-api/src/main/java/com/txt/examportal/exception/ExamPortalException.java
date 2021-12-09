package com.txt.examportal.exception;

public class ExamPortalException extends RuntimeException {

    public ExamPortalException() {
        super("ExamPortalException");
    }

    public ExamPortalException(String message) {
        super(message);
    }
}

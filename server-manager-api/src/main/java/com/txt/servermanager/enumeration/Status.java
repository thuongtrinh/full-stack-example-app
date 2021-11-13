package com.txt.servermanager.enumeration;

public enum Status {

    SERVER_DOWN("SERVER_DOWN"),
    SERVER_UP("SERVER_UP");

    private final String status;

    Status(String status){
        this.status = status;
    }

    public String getStatus() {
        return status;
    }
}
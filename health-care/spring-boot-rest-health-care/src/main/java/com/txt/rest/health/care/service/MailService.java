package com.txt.rest.health.care.service;

public interface MailService {
    void sendEmailVerifyBooking(Long bookingId, String language);
}

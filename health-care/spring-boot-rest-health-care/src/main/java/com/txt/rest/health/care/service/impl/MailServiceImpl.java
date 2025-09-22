package com.txt.rest.health.care.service.impl;

import com.txt.rest.health.care.constant.Constants;
import com.txt.rest.health.care.dto.mail.VerifyBookingDTO;
import com.txt.rest.health.care.entity.postgres.Booking;
import com.txt.rest.health.care.repository.postgres.BookingRepository;
import com.txt.rest.health.care.service.MailService;
import com.txt.rest.health.care.utils.DateUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class MailServiceImpl implements MailService {

    private final Environment env;
    private final MailSenderService mailSenderService;
    private final BookingRepository bookingRepository;

    @Override
    @Async
    public void sendEmailVerifyBooking(Long bookingId, String language) {
        log.info("sendEmailVerifyBooking data: {}", bookingId);
        Booking booking = bookingRepository.findById(bookingId).get();

        String doctorName = booking.getUserDoctor().getLastName() + Constants.SPACE + booking.getUserDoctor().getFirstName();
        String patientName = booking.getUserPatient().getLastName() + Constants.SPACE + booking.getUserPatient().getFirstName();
        String time = booking.getAllCodeTime().getValueEn() + Constants.SPACE + DateUtils.formatLocalDate(booking.getDate(), DateUtils.DD_MM_YYYY_EEEE);
        if (Constants.LANG_VI.equalsIgnoreCase(language)) {
            doctorName = booking.getUserDoctor().getFirstName() + Constants.SPACE + booking.getUserDoctor().getLastName();
            patientName = booking.getUserPatient().getFirstName() + Constants.SPACE + booking.getUserPatient().getLastName();
            time = booking.getAllCodeTime().getValueVi() + Constants.SPACE + DateUtils.formatLocalDate_VN(booking.getDate(), DateUtils.DD_MM_YYYY_EEEE);
        }

        String url = String.format(Objects.requireNonNull(env.getProperty(Constants.MailConstant.URL_UI_HEALTH_CARE)),
                booking.getDoctorId(), booking.getPatientId(), booking.getToken());

        Map<String, String> params = new HashMap<>();
        params.put(Constants.Params.LANGUAGE, language);
        params.put(Constants.Params.DOCTOR_NAME, doctorName);
        params.put(Constants.Params.PATIEN_NAME, patientName);
        params.put(Constants.Params.TIME, time);
        params.put(Constants.Params.URL, url);

        VerifyBookingDTO verifyBookingDTO = VerifyBookingDTO.builder()
                .templateName(Constants.TEMPLATE_HEALTH_CARE_BOOKING_VERIFY)
//                .emailTo(List.of(booking.getUserPatient().getEmail()))
                .emailTo(List.of("trinhxuan92@gmail.com"))
//                .emailCc(List.of(env.getProperty(Constants.MailConstant.EMAIL_CC_RULE)))
                .emailSubject(Constants.SUBJECT_MAIL_VERIFY_BOOKING)
                .params(params)
                .build();
        mailSenderService.sendEmailByTemplate(verifyBookingDTO.toString());
    }
}

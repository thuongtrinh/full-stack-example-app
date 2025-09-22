package com.txt.rest.health.care.service;

import com.txt.rest.health.care.dto.posgre.AllCodeDTO;
import com.txt.rest.health.care.dto.posgre.BookingDTO;
import com.txt.rest.health.care.dto.posgre.DoctorDTO;
import com.txt.rest.health.care.dto.posgre.ProfileDTO;
import com.txt.rest.health.care.dto.request.BookingAppointmentDTO;
import com.txt.rest.health.care.dto.request.ConfirmTokenBookingDTO;
import com.txt.rest.health.care.dto.response.DoctorInfoDTO;

import java.util.List;

public interface HealthCareService {
    List<AllCodeDTO> getAllCodeByType(String type);

    List<AllCodeDTO> getAllCodeByList(List<String> type);

    DoctorInfoDTO getDoctorInfoById(Long doctorId);

    DoctorDTO getDoctorExtra(Long doctorId);

    ProfileDTO getProfileByDoctorId(Long doctorId);

    BookingDTO patientBookingAppointment(BookingAppointmentDTO data);

    boolean confirmTokenBooking(ConfirmTokenBookingDTO tokenBookingDTO);
}
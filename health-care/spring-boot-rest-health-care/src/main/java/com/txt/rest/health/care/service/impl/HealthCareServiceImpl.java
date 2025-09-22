package com.txt.rest.health.care.service.impl;

import com.txt.rest.health.care.constant.Constants;
import com.txt.rest.health.care.dto.posgre.*;
import com.txt.rest.health.care.dto.request.BookingAppointmentDTO;
import com.txt.rest.health.care.dto.request.ConfirmTokenBookingDTO;
import com.txt.rest.health.care.dto.request.UserRequestDTO;
import com.txt.rest.health.care.dto.request.UserUpdateDTO;
import com.txt.rest.health.care.dto.response.DoctorInfoDTO;
import com.txt.rest.health.care.entity.postgres.AllCode;
import com.txt.rest.health.care.entity.postgres.Booking;
import com.txt.rest.health.care.entity.postgres.Doctor;
import com.txt.rest.health.care.mapper.AllCodeMapper;
import com.txt.rest.health.care.mapper.BookingMapper;
import com.txt.rest.health.care.mapper.DoctorMapper;
import com.txt.rest.health.care.repository.postgres.AllCodeRepository;
import com.txt.rest.health.care.repository.postgres.BookingRepository;
import com.txt.rest.health.care.repository.postgres.DoctorRepository;
import com.txt.rest.health.care.service.AdminService;
import com.txt.rest.health.care.service.HealthCareService;
import com.txt.rest.health.care.service.MailService;
import com.txt.rest.health.care.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class HealthCareServiceImpl implements HealthCareService {

    private final AllCodeRepository allCodeRepository;
    private final AllCodeMapper allCodeMapper;
    private final UserService userService;
    private final AdminService adminService;
    private final DoctorRepository doctorRepository;
    private final DoctorMapper doctorMapper;
    private final BookingRepository bookingRepository;
    private final BookingMapper bookingMapper;
    private final MailService mailService;


    @Override
    public List<AllCodeDTO> getAllCodeByType(String type) {
        List<AllCode> allCodes = allCodeRepository.findByType(type);
        if (ObjectUtils.isEmpty(allCodes)) {
            log.info("getAllCodeByType not found data by type {}", type);
            return null;
        }
        return allCodes.stream().map(entity -> allCodeMapper.toDTO(entity)).collect(Collectors.toList());
    }

    @Override
    public List<AllCodeDTO> getAllCodeByList(List<String> types) {
        List<AllCode> allCodes = allCodeRepository.findByTypeInOrderByKey(types);
        if (ObjectUtils.isEmpty(allCodes)) {
            log.info("getAllCodeByList not found data by type {}", types);
            return null;
        }
        return allCodes.stream().map(entity -> allCodeMapper.toDTO(entity)).collect(Collectors.toList());
    }

    @Override
    public DoctorInfoDTO getDoctorInfoById(Long doctorId) {
        DoctorInfoDTO doctorInfoDTO = new DoctorInfoDTO();
        doctorInfoDTO.setIntro(userService.getUser(doctorId));
        doctorInfoDTO.setDetail(adminService.getMarkdownByDoctor(doctorId));
        Doctor doctor = doctorRepository.findFirstByDoctorId(doctorId);
        if (ObjectUtils.isNotEmpty(doctor)) {
            DoctorDTO doctorDTO = doctorMapper.toDTO(doctor);
            doctorInfoDTO.setDoctor(doctorDTO);
        }
        return doctorInfoDTO;
    }

    @Override
    public DoctorDTO getDoctorExtra(Long doctorId) {
        log.info("getDoctorExtra by doctorId {}", doctorId);
        Doctor doctor = doctorRepository.findFirstByDoctorId(doctorId);
        if (ObjectUtils.isNotEmpty(doctor)) {
            DoctorDTO doctorDTO = doctorMapper.toDTO(doctor);
            return doctorDTO;
        }
        return null;
    }

    @Override
    public ProfileDTO getProfileByDoctorId(Long doctorId) {
        log.info("getProfileByDoctorId by doctorId {}", doctorId);
        ProfileDTO profileDTO = new ProfileDTO();
        DoctorInfoDTO doctorInfoDTO = this.getDoctorInfoById(doctorId);
        if (ObjectUtils.isNotEmpty(doctorInfoDTO.getDetail())) {
            profileDTO.setDoctorId(doctorId);
            profileDTO.setDescription(doctorInfoDTO.getDetail().getDescription());
        }
        if (ObjectUtils.isNotEmpty(doctorInfoDTO.getDoctor())) {
            profileDTO.setPrice(doctorInfoDTO.getDoctor().getPrice());
        }
        if (ObjectUtils.isNotEmpty(doctorInfoDTO.getIntro())) {
            profileDTO.setFirstName(doctorInfoDTO.getIntro().getFirstName());
            profileDTO.setLastName(doctorInfoDTO.getIntro().getLastName());
            profileDTO.setRole(doctorInfoDTO.getIntro().getRole());
        }
        return profileDTO;
    }

    @Override
    public BookingDTO patientBookingAppointment(BookingAppointmentDTO data) {
        log.info("Process patientBookingAppointment data: {}", data);
        UsersDTO usersDTO = userService.getUserInfo(data.getEmail());
        if (ObjectUtils.isNotEmpty(usersDTO)) {
            if (Constants.RoleKey.ADMIN.equals(usersDTO.getRoleKey()) || Constants.RoleKey.DOCTOR.equals(usersDTO.getRoleKey())) {
                log.error("Error patientBookingAppointment existed email {} with roleKey {}", data.getEmail(), usersDTO.getRoleKey());
                return null;
            }

            UserUpdateDTO updateDTO = new UserUpdateDTO();
            updateDTO.setId(usersDTO.getId());
            updateDTO.setAddress(data.getAddress());
            updateDTO.setFirstName(getPatientName(data.getFullName(), 0));
            updateDTO.setLastName(getPatientName(data.getFullName(), 1));
            updateDTO.setGender(data.getGender());
            updateDTO.setPhoneNumber(data.getPhoneNumber());
            updateDTO.setRole(Constants.RoleKey.PATIENT);
            userService.updateUser(updateDTO);
        } else {
            UserRequestDTO userRequestDTO = new UserRequestDTO();
            BeanUtils.copyProperties(data, userRequestDTO);
            userRequestDTO.setFirstName(getPatientName(data.getFullName(), 0));
            userRequestDTO.setLastName(getPatientName(data.getFullName(), 1));
            userRequestDTO.setRole(Constants.RoleKey.PATIENT);
            userRequestDTO.setPassword(StringUtils.EMPTY);
            usersDTO = userService.addUser(userRequestDTO);
        }

        List<Booking> doctorBookings = bookingRepository.findAllByDoctorIdAndDateAndTimeKey(data.getDoctorId(), data.getDate(), data.getTimeKey());
        if (ObjectUtils.isNotEmpty(doctorBookings)) {
            log.error("Error patientBookingAppointment doctorBookings is busy in this time: {}", data);
            return null;
        }

        List<Booking> patientBookings = bookingRepository.findAllByPatientIdAndDateAndTimeKey(data.getDoctorId(), data.getDate(), data.getTimeKey());
        Booking booking = null;
        if (ObjectUtils.isNotEmpty(patientBookings)) {
            for (Booking bookingData : patientBookings) {
                if (Constants.StatusKey.NEW.equals(bookingData.getStatusKey())) {
                    log.info("reBooking patientBookingAppointment data: {}", data);
                    booking = bookingData;
                    break;
                }
            }
        }

        if (ObjectUtils.isEmpty(booking)) {
            booking = new Booking();
        }

        booking.setDoctorId(data.getDoctorId());
        booking.setPatientId(usersDTO.getId());
        booking.setStatusKey(Constants.StatusKey.NEW);
        booking.setTimeKey(data.getTimeKey());
        booking.setDate(data.getDate());
        booking.setToken(UUID.randomUUID().toString());
        booking.setUpdatedDate(LocalDateTime.now());
        booking.setCreatedDate(LocalDateTime.now());
        Booking bookingResp = bookingRepository.save(booking);
        BookingDTO bookingDTO = bookingMapper.toDTO(bookingResp);
        if (ObjectUtils.isNotEmpty(bookingDTO)) {
            mailService.sendEmailVerifyBooking(bookingResp.getId(), data.getLanguage());
            return bookingDTO;
        }
        return null;
    }

    @Override
    public boolean confirmTokenBooking(ConfirmTokenBookingDTO tokenDTO) {
        if (ObjectUtils.isEmpty(tokenDTO.getDoctorId()) || ObjectUtils.isEmpty(tokenDTO.getPatientId()) || ObjectUtils.isEmpty(tokenDTO.getToken())) {
            log.error("confirmTokenBooking invalid tokenBookingDTO: {} ", tokenDTO);
            return false;
        }

        List<Booking> bookings = bookingRepository.findAllByDoctorIdAndPatientIdAndToken(tokenDTO.getDoctorId(), tokenDTO.getPatientId(), tokenDTO.getToken());
        if (ObjectUtils.isNotEmpty(bookings)) {
            Booking booking = bookings.get(0);
            if (Constants.StatusKey.NEW.equals(booking.getStatusKey())) {
                booking.setStatusKey(Constants.StatusKey.CONFIRMED);
                booking.setUpdatedDate(LocalDateTime.now());
                bookingRepository.save(booking);

                log.info("confirmTokenBooking success: {}", tokenDTO);
                return true;
            } else {
                log.error("confirmTokenBooking has been confirmed with Data: {} ", tokenDTO);
                return false;
            }
        }

        log.error("confirmTokenBooking not found in database with Data: {} ", tokenDTO);
        return false;
    }

    private String getPatientName(String fullName, int i) {
        if (StringUtils.isBlank(fullName)) {
            return null;
        }
        int indexFirst = fullName.indexOf(Constants.SPACE);
        if (indexFirst == -1) {
            return i == 0 ? fullName : null;
        } else if (i == 0) {
            return fullName.substring(0, indexFirst);
        } else if (fullName.length() > indexFirst) {
            return fullName.substring(indexFirst + 1, fullName.length());
        }
        return null;
    }

}

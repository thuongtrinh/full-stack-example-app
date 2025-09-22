package com.txt.rest.health.care.service.impl;

import com.txt.rest.health.care.dto.posgre.DoctorDTO;
import com.txt.rest.health.care.dto.posgre.MarkdownDTO;
import com.txt.rest.health.care.dto.posgre.ScheduleDTO;
import com.txt.rest.health.care.dto.posgre.UsersDTO;
import com.txt.rest.health.care.dto.request.DoctorRequestDTO;
import com.txt.rest.health.care.dto.request.MarkdownRequestDTO;
import com.txt.rest.health.care.dto.request.SaveScheduleDTO;
import com.txt.rest.health.care.dto.request.ScheduleRequestDTO;
import com.txt.rest.health.care.entity.postgres.Doctor;
import com.txt.rest.health.care.entity.postgres.Markdown;
import com.txt.rest.health.care.entity.postgres.Schedule;
import com.txt.rest.health.care.mapper.DoctorMapper;
import com.txt.rest.health.care.mapper.MarkdownMapper;
import com.txt.rest.health.care.mapper.ScheduleMapper;
import com.txt.rest.health.care.repository.postgres.AllCodeRepository;
import com.txt.rest.health.care.repository.postgres.DoctorRepository;
import com.txt.rest.health.care.repository.postgres.MarkdownRepository;
import com.txt.rest.health.care.repository.postgres.ScheduleRepository;
import com.txt.rest.health.care.service.AdminService;
import com.txt.rest.health.care.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Slf4j
public class AdminServiceImpl implements AdminService {

    private final MarkdownRepository markdownRepository;
    private final MarkdownMapper markdownMapper;
    private final UserService userService;
    private final AllCodeRepository allCodeRepository;
    private final ScheduleRepository scheduleRepository;
    private final ScheduleMapper scheduleMapper;
    private final DoctorRepository doctorRepository;
    private final DoctorMapper doctorMapper;

    @Override
    public MarkdownDTO saveMarkdown(MarkdownRequestDTO dto) {
        Markdown markdown = null;
        if (Objects.nonNull(dto.getDoctorId()) && dto.getDoctorId() != 0) {
            UsersDTO usersDTO = userService.getUser(dto.getDoctorId());
            if (ObjectUtils.isEmpty(usersDTO)) {
                log.error("saveMarkdown for updating not found doctorId {}", dto.getDoctorId());
                return null;
            }
            markdown = markdownRepository.findFirstByDoctorId(dto.getDoctorId());
        }

        if (Objects.nonNull(markdown)) {
            markdown.setContentMarkdown(dto.getContentMarkdown());
            markdown.setDescription(dto.getDescription());
            markdown.setContentHtml(dto.getContentHtml());
            markdown.setUpdatedDate(LocalDateTime.now());
        } else {
            MarkdownDTO markdownDTO = new MarkdownDTO();
            setMarkdownId(dto);
            BeanUtils.copyProperties(dto, markdownDTO);
            markdown = markdownMapper.toEntity(markdownDTO);
            markdown.setCreatedDate(LocalDateTime.now());
            markdown.setUpdatedDate(LocalDateTime.now());
        }
        Markdown markdownResp = markdownRepository.save(markdown);
        return markdownMapper.toDTO(markdownResp);
    }

    @Override
    public MarkdownDTO getMarkdownByDoctor(Long doctorId) {
        Markdown markdown = markdownRepository.findFirstByDoctorId(doctorId);
        if (Objects.isNull(markdown)) {
            log.info("getMarkdownByDoctor not found by doctorId {}", doctorId);
            return null;
        }
        MarkdownDTO dto = markdownMapper.toDTO(markdown);
        dto.setId(markdown.getId());
        return dto;
    }

    @Override
    public boolean saveSchedule(SaveScheduleDTO data) {
        log.info("Process saveSchedule request: {}", data);
        if (ObjectUtils.isEmpty(data) || ObjectUtils.isEmpty(data.getTimeKeys()) || ObjectUtils.isEmpty(data.getDoctorId()) || ObjectUtils.isEmpty(data.getDate())) {
            log.error("saveSchedule - invalid data required: {}", data);
            return false;
        }

        List<String> timeKeyList = data.getTimeKeys();
        List<Schedule> schedules = new ArrayList<>();
        Schedule schedule;
        Integer doctorId = data.getDoctorId();
        for (String timeKey : timeKeyList) {
            boolean isValid = isValidateScheduleDTO(data, timeKey);
            if (!isValid) {
                log.error("isValidateScheduleDTO isValid {} data request: {}", isValid, data);
                return false;
            }

            schedule = scheduleRepository.findFirstByDoctorIdAndTimeKeyAndDate(doctorId, timeKey, data.getDate());
            if (Objects.isNull(schedule)) {
                schedule = new Schedule();
                schedule.setDoctorId(doctorId);
                schedule.setDate(data.getDate());
                schedule.setTimeKey(timeKey);
                schedule.setCreatedDate(LocalDateTime.now());
            } else {
                schedule.setTimeKey(timeKey);
            }

            schedule.setUpdatedDate(LocalDateTime.now());
            schedules.add(schedule);
        }

        scheduleRepository.deleteByDoctorIdAndDateAndTimeKeyNotInList(doctorId, data.getDate(), data.getTimeKeys());
        scheduleRepository.saveAll(schedules);
        log.info("saveAll schedule successfully");
        return true;
    }

    @Override
    public List<ScheduleDTO> getSchedule(ScheduleRequestDTO data) {
        List<Schedule> schedules = scheduleRepository.findAllByDoctorIdAndDate(data.getDoctorId(), data.getDate());
        if (ObjectUtils.isEmpty(schedules)) {
            log.info("Not found any schedules by data {}", data);
            return null;
        }
        List<ScheduleDTO> scheduleDTOs = new ArrayList<>();
        schedules.stream().forEach(schedule -> scheduleDTOs.add(scheduleMapper.toDTO(schedule)));
        return scheduleDTOs;
    }

    @Override
    @Transactional
    public boolean saveDoctorInfo(DoctorRequestDTO data) {
        MarkdownRequestDTO markdownRequestDTO = new MarkdownRequestDTO();
        BeanUtils.copyProperties(data, markdownRequestDTO);
        MarkdownDTO markdownDTO = this.saveMarkdown(markdownRequestDTO);
        if (ObjectUtils.isEmpty(markdownDTO)) {
            log.error("saveDoctorInfo:: saveMarkdown error data request: {}", data);
            return false;
        }

        DoctorDTO doctorDTO = this.saveDoctor(data);
        if (ObjectUtils.isEmpty(doctorDTO)) {
            return false;
        }
        return true;
    }

    private DoctorDTO saveDoctor(DoctorRequestDTO dto) {
        Doctor doctor = null;
        if (Objects.nonNull(dto.getDoctorId()) && dto.getDoctorId() != 0) {
            UsersDTO usersDTO = userService.getUser(dto.getDoctorId());
            if (ObjectUtils.isEmpty(usersDTO)) {
                log.error("saveDoctor not found doctorId {}", dto.getDoctorId());
                return null;
            }
            doctor = doctorRepository.findFirstByDoctorId(dto.getDoctorId());
        }

        if (Objects.nonNull(doctor)) {
            doctor.setPaymentKey(dto.getPaymentKey());
            doctor.setPriceKey(dto.getPriceKey());
            doctor.setProvinceKey(dto.getProvinceKey());
            doctor.setAddressClinic(dto.getAddressClinic());
            doctor.setNameClinic(dto.getNameClinic());
            doctor.setNote(dto.getNote());
            doctor.setUpdatedDate(LocalDateTime.now());
        } else {
            doctor = new Doctor();
            BeanUtils.copyProperties(dto, doctor);
            doctor.setCount(0);
            doctor.setCreatedDate(LocalDateTime.now());
            doctor.setUpdatedDate(LocalDateTime.now());
        }
        Doctor doctorResp = doctorRepository.save(doctor);
        return doctorMapper.toDTO(doctorResp);
    }

    private boolean isValidateScheduleDTO(SaveScheduleDTO data, String timeKey) {
        if (StringUtils.isEmpty(timeKey)) {
            log.error("isValidateScheduleDTO error data request empty in list {}", data.getTimeKeys());
            return false;
        } else if (ObjectUtils.isEmpty(userService.getUser(Long.valueOf(data.getDoctorId())))) {
            log.error("isValidateScheduleDTO not found doctorId {}", data.getDoctorId());
            return false;
        } else if (ObjectUtils.isEmpty(allCodeRepository.findByKey(timeKey))) {
            log.error("isValidateScheduleDTO not found timeKey {}", timeKey);
            return false;
        } else if (isDuplicatedTimeKey(data.getTimeKeys())) {
            log.error("isValidateScheduleDTO duplicated timeKey request {}", data.getTimeKeys());
            return false;
        }
        return true;
    }

    private boolean isDuplicatedTimeKey(List<String> timeKeys) {
        long count = timeKeys.stream().collect(Collectors.toSet()).stream().count();
        if (count < timeKeys.size()) {
            return true;
        }
        return false;
    }

    public void setMarkdownId(MarkdownRequestDTO dto) {
        if (Objects.nonNull(dto.getDoctorId()) && dto.getDoctorId() != 0) {
            dto.setSpecialityId(null);
            dto.setClinicId(null);
        } else if (Objects.nonNull(dto.getSpecialityId()) && dto.getSpecialityId() != 0) {
            dto.setClinicId(null);
            dto.setDoctorId(null);
        } else if (Objects.nonNull(dto.getClinicId()) && dto.getClinicId() == 0) {
            dto.setSpecialityId(null);
            dto.setDoctorId(null);
        }
    }
}

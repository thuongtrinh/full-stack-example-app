package com.txt.rest.health.care.service;

import com.txt.rest.health.care.dto.posgre.MarkdownDTO;
import com.txt.rest.health.care.dto.posgre.ScheduleDTO;
import com.txt.rest.health.care.dto.request.DoctorRequestDTO;
import com.txt.rest.health.care.dto.request.MarkdownRequestDTO;
import com.txt.rest.health.care.dto.request.SaveScheduleDTO;
import com.txt.rest.health.care.dto.request.ScheduleRequestDTO;

import java.util.List;

public interface AdminService {
    MarkdownDTO saveMarkdown(MarkdownRequestDTO data);

    MarkdownDTO getMarkdownByDoctor(Long doctorId);

    boolean saveSchedule(SaveScheduleDTO data);

    List<ScheduleDTO> getSchedule(ScheduleRequestDTO data);

    boolean saveDoctorInfo(DoctorRequestDTO data);
}
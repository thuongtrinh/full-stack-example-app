package com.txt.rest.health.care.mapper;

import com.txt.rest.health.care.dto.posgre.ScheduleDTO;
import com.txt.rest.health.care.mapper.generic.GenericMapper;
import com.txt.rest.health.care.entity.postgres.Schedule;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface ScheduleMapper extends GenericMapper<Schedule, ScheduleDTO> {
}
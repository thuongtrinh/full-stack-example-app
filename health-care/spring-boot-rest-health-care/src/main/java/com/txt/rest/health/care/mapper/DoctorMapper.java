package com.txt.rest.health.care.mapper;

import com.txt.rest.health.care.dto.posgre.DoctorDTO;
import com.txt.rest.health.care.entity.postgres.Doctor;
import com.txt.rest.health.care.mapper.generic.GenericMapper;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface DoctorMapper extends GenericMapper<Doctor, DoctorDTO> {
}
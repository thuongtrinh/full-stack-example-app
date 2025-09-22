package com.txt.rest.health.care.mapper;

import com.txt.rest.health.care.dto.posgre.DoctorClinicSpecialtyDTO;
import com.txt.rest.health.care.mapper.generic.GenericMapper;
import com.txt.rest.health.care.entity.postgres.DoctorClinicSpecialty;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface DoctorClinicSpecialtyMapper extends GenericMapper<DoctorClinicSpecialty, DoctorClinicSpecialtyDTO> {
}
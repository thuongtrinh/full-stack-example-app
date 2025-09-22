package com.txt.rest.health.care.mapper;

import com.txt.rest.health.care.dto.posgre.ClinicDTO;
import com.txt.rest.health.care.mapper.generic.GenericMapper;
import com.txt.rest.health.care.entity.postgres.Clinic;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface ClinicMapper extends GenericMapper<Clinic, ClinicDTO> {
}
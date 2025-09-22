package com.txt.rest.health.care.mapper;

import com.txt.rest.health.care.dto.posgre.SpecialityDTO;
import com.txt.rest.health.care.mapper.generic.GenericMapper;
import com.txt.rest.health.care.entity.postgres.Speciality;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface SpecialityMapper extends GenericMapper<Speciality, SpecialityDTO> {
}
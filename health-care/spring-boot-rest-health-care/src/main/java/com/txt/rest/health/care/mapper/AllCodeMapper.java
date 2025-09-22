package com.txt.rest.health.care.mapper;

import com.txt.rest.health.care.dto.posgre.AllCodeDTO;
import com.txt.rest.health.care.mapper.generic.GenericMapper;
import com.txt.rest.health.care.entity.postgres.AllCode;
import com.txt.rest.health.care.mapper.generic.KeyGenericMapper;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface AllCodeMapper extends KeyGenericMapper<AllCode, AllCodeDTO> {
}
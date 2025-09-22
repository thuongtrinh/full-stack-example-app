package com.txt.rest.health.care.mapper.generic;

import com.txt.rest.health.care.dto.common.BaseDTO;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

public interface GenericMapper<T, DTO extends BaseDTO> {
    T toEntity(DTO dto);

    DTO toDTO(T entity);

    @Mapping(target = "id", ignore = true)
    T toEntity(@MappingTarget T entity, DTO dto);
}

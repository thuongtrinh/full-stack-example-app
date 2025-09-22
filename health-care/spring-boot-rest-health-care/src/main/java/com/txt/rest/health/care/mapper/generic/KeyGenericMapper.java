package com.txt.rest.health.care.mapper.generic;

import org.mapstruct.MappingTarget;

public interface KeyGenericMapper<T, DTO> {
    T toEntity(DTO dto);

    DTO toDTO(T entity);

    T toEntity(@MappingTarget T entity, DTO dto);
}

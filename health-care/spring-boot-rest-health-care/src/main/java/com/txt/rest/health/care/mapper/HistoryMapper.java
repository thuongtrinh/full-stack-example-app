package com.txt.rest.health.care.mapper;

import com.txt.rest.health.care.dto.posgre.HistoryDTO;
import com.txt.rest.health.care.mapper.generic.GenericMapper;
import com.txt.rest.health.care.entity.postgres.History;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface HistoryMapper extends GenericMapper<History, HistoryDTO> {
}
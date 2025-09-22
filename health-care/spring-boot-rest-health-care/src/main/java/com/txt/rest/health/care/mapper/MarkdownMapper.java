package com.txt.rest.health.care.mapper;

import com.txt.rest.health.care.dto.posgre.MarkdownDTO;
import com.txt.rest.health.care.entity.postgres.Markdown;
import com.txt.rest.health.care.mapper.generic.GenericMapper;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface MarkdownMapper extends GenericMapper<Markdown, MarkdownDTO> {
}
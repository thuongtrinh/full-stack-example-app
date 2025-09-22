package com.txt.rest.health.care.mapper;

import com.txt.rest.health.care.dto.posgre.UsersDTO;
import com.txt.rest.health.care.mapper.generic.GenericMapper;
import com.txt.rest.health.care.entity.postgres.Users;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface UserMapper extends GenericMapper<Users, UsersDTO> {
}
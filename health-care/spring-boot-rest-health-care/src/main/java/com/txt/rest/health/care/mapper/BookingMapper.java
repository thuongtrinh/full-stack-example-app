package com.txt.rest.health.care.mapper;

import com.txt.rest.health.care.dto.posgre.BookingDTO;
import com.txt.rest.health.care.mapper.generic.GenericMapper;
import com.txt.rest.health.care.entity.postgres.Booking;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface BookingMapper extends GenericMapper<Booking, BookingDTO> {
}
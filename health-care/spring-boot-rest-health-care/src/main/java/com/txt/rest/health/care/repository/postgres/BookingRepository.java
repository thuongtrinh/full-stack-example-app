package com.txt.rest.health.care.repository.postgres;

import com.txt.rest.health.care.entity.postgres.Booking;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends CrudRepository<Booking, Long> {
    List<Booking> findAllByDoctorIdAndDateAndTimeKey(Long doctorId, LocalDate date, String timeKey);

    List<Booking> findAllByPatientIdAndDateAndTimeKey(Long patientId, LocalDate date, String timeKey);

    List<Booking> findAllByDoctorIdAndPatientIdAndToken(Long doctorId, Long patientId, String token);

}

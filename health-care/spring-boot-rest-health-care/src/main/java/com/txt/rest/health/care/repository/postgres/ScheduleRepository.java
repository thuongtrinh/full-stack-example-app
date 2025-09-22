package com.txt.rest.health.care.repository.postgres;

import com.txt.rest.health.care.entity.postgres.Schedule;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ScheduleRepository extends CrudRepository<Schedule, Long> {

    Schedule findFirstByDoctorIdAndTimeKeyAndDate(Integer doctorId, String timeKey, LocalDate date);

    @Modifying
    @Transactional
    @Query("delete from Schedule s where s.doctorId = :doctorId and s.date = :date and s.timeKey not in :timeKeys")
    void deleteByDoctorIdAndDateAndTimeKeyNotInList(@Param("doctorId") Integer doctorId, @Param("date") LocalDate date, @Param("timeKeys") List<String> timeKeys);

    List<Schedule> findAllByDoctorIdAndDate(Integer doctorId, LocalDate date);

}

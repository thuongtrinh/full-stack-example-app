package com.txt.rest.health.care.controller;

import com.txt.rest.health.care.constant.Constants;
import com.txt.rest.health.care.dto.common.*;
import com.txt.rest.health.care.dto.posgre.*;
import com.txt.rest.health.care.dto.request.*;
import com.txt.rest.health.care.dto.response.DoctorInfoDTO;
import com.txt.rest.health.care.service.AdminService;
import com.txt.rest.health.care.service.HealthCareService;
import com.txt.rest.health.care.service.UserService;
import com.txt.rest.health.care.utils.APIUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.MDC;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import java.util.List;
import java.util.Locale;
import java.util.Objects;

@RestController
@Tag(name = "HealthCare Controller", description = "Health Care API")
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/heath-care")
public class HealthCareController {

    private final HttpServletRequest httpServletRequest;
    private final HealthCareService healthCareService;
    private final UserService userService;
    private final AdminService adminService;


    @ApiResponses({@ApiResponse(
            responseCode = "200",
            description = "Action was executed."
    ), @ApiResponse(
            responseCode = "400",
            description = "Invalid action was supplied."
    ), @ApiResponse(
            responseCode = "404",
            description = "Action request was not found."
    ), @ApiResponse(
            responseCode = "500",
            description = "Action error server."
    )})
    @Operation(description = "List user API")
    @PostMapping(path = "/list-user", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<APIStandardResponseDTO<APIPagingResponseDTO>> getPagingListUser(
            @RequestBody APIPagingRequestDTO<SearchRequestDTO> requestDTO,
            @RequestHeader(value = "Authorization", required = false) String bearerToken) {

        APIStandardResponseDTO<APIPagingResponseDTO> response = new APIStandardResponseDTO<>();
        String exchangeId = APIUtils.getExchangeId(requestDTO.getExchangeId());
        response.setExchangeId(exchangeId);
        try {
            MDC.put(Constants.TRACK_ID, exchangeId);
            log.info("URI: {}", httpServletRequest.getRequestURI());

            APIPagingResponseDTO<UsersDTO> responseDTO = userService.getPagingListUser(requestDTO);
            response.setData(responseDTO);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Get paging list User has error encountered {}", e.getMessage(), e);
            return new ResponseEntity<>(APIUtils.statusError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(description = "Get all code by type list API")
    @PostMapping(path = "/all-code", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<APIStandardResponseDTO> getAllCodeByList(
            @RequestBody APIStandardRequestDTO<AllCodeRequestDTO> requestDTO,
            @RequestHeader(value = "Authorization", required = false) String bearerToken
    ) {

        APIStandardResponseDTO<List<AllCodeDTO>> response = new APIStandardResponseDTO<>();
        String exchangeId = APIUtils.getExchangeId(StringUtils.EMPTY);
        response.setExchangeId(exchangeId);
        try {
            MDC.put(Constants.TRACK_ID, exchangeId);
            log.info("URI: {}", httpServletRequest.getRequestURI());

            response.setData(healthCareService.getAllCodeByList(requestDTO.getData().getTypes()));
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Get all code has error encountered {}", e.getMessage(), e);
            return new ResponseEntity<>(APIUtils.statusError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(description = "Get doctor info by id API")
    @PostMapping(path = "/doctor-info/{doctorId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<APIStandardResponseDTO> getDoctorDetailById(
            @RequestHeader(value = "Authorization", required = false) String bearerToken,
            @PathVariable(value = "doctorId") Long doctorId
    ) {
        APIStandardResponseDTO<DoctorInfoDTO> response = new APIStandardResponseDTO<>();
        String exchangeId = APIUtils.getExchangeId(StringUtils.EMPTY);
        response.setExchangeId(exchangeId);
        try {
            MDC.put(Constants.TRACK_ID, exchangeId);
            log.info("URI: {}", httpServletRequest.getRequestURI());

            response.setData(healthCareService.getDoctorInfoById(doctorId));
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Save markdown has error encountered {}", e.getMessage(), e);
            return new ResponseEntity<>(APIUtils.statusError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(description = "Get schedule time API")
    @PostMapping(path = "/schedule-time/get", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<APIStandardResponseDTO> getSchedule(
            @RequestBody APIStandardRequestDTO<ScheduleRequestDTO> requestDTO,
            @RequestHeader(value = "Authorization", required = false) String bearerToken
    ) {

        APIStandardResponseDTO<List<ScheduleDTO>> response = new APIStandardResponseDTO<>();
        String exchangeId = APIUtils.getExchangeId(StringUtils.EMPTY);
        response.setExchangeId(exchangeId);
        try {
            MDC.put(Constants.TRACK_ID, exchangeId);
            log.info("URI: {}", httpServletRequest.getRequestURI());

            List<ScheduleDTO> scheduleDTOs = adminService.getSchedule(requestDTO.getData());
            response.setData(scheduleDTOs);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Get schedule has error encountered {}", e.getMessage(), e);
            return new ResponseEntity<>(APIUtils.statusError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(description = "Get doctor extra info API")
    @GetMapping(path = "/doctor-extra/{doctorId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<APIStandardResponseDTO> getDoctorExtra(
            @PathVariable(value = "doctorId") Long doctorId,
            @RequestHeader(value = "Authorization", required = false) String bearerToken
    ) {

        APIStandardResponseDTO<DoctorDTO> response = new APIStandardResponseDTO<>();
        String exchangeId = APIUtils.getExchangeId(StringUtils.EMPTY);
        response.setExchangeId(exchangeId);
        try {
            MDC.put(Constants.TRACK_ID, exchangeId);
            log.info("URI: {}", httpServletRequest.getRequestURI());

            DoctorDTO doctorExtra = healthCareService.getDoctorExtra(doctorId);
            response.setData(doctorExtra);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Get schedule has error encountered {}", e.getMessage(), e);
            return new ResponseEntity<>(APIUtils.statusError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(description = "Get markdown by doctorId API")
    @GetMapping(path = "/markdown/{doctorId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<APIStandardResponseDTO> getMarkdownByDoctorId(
            @RequestHeader(value = "Authorization", required = false) String bearerToken,
            @PathVariable(value = "doctorId") Long doctorId) {

        APIStandardResponseDTO<MarkdownDTO> response = new APIStandardResponseDTO<>();
        String exchangeId = APIUtils.getExchangeId(StringUtils.EMPTY);
        response.setExchangeId(exchangeId);
        try {
            MDC.put(Constants.TRACK_ID, exchangeId);
            log.info("URI: {}", httpServletRequest.getRequestURI());

            response.setData(adminService.getMarkdownByDoctor(doctorId));
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Get user by id has error encountered {}", e.getMessage(), e);
            return new ResponseEntity<>(APIUtils.statusError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(description = "Get profile by doctorId API")
    @GetMapping(path = "/doctor-profile/{doctorId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<APIStandardResponseDTO> getProfileByDoctorId(
            @RequestHeader(value = "Authorization", required = false) String bearerToken,
            @PathVariable(value = "doctorId") Long doctorId) {

        APIStandardResponseDTO<ProfileDTO> response = new APIStandardResponseDTO<>();
        String exchangeId = APIUtils.getExchangeId(StringUtils.EMPTY);
        response.setExchangeId(exchangeId);
        try {
            MDC.put(Constants.TRACK_ID, exchangeId);
            log.info("URI: {}", httpServletRequest.getRequestURI());

            response.setData(healthCareService.getProfileByDoctorId(doctorId));
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Get doctor profile by id has error encountered {}", e.getMessage(), e);
            return new ResponseEntity<>(APIUtils.statusError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(description = "Patient booking appointment API")
    @PostMapping(path = "/patient-booking-appointment", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<APIStandardResponseDTO> patientBookingAppointment(
            @RequestHeader(value = "Authorization", required = false) String bearerToken,
            @Valid @RequestBody APIStandardRequestDTO<BookingAppointmentDTO> requestDTO) {

        APIStandardResponseDTO<BookingDTO> response = new APIStandardResponseDTO<>();
        String exchangeId = APIUtils.getExchangeId(StringUtils.EMPTY);
        response.setExchangeId(exchangeId);
        try {
            MDC.put(Constants.TRACK_ID, exchangeId);
            log.info("URI: {}", httpServletRequest.getRequestURI());

            BookingDTO bookingDTO = healthCareService.patientBookingAppointment(requestDTO.getData());
            if (Objects.isNull(bookingDTO)) {
                return new ResponseEntity<>(APIUtils.statusError(ResponseCode.ERROR_001), HttpStatus.INTERNAL_SERVER_ERROR);
            }

            response.setData(bookingDTO);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Get doctor profile by id has error encountered {}", e.getMessage(), e);
            return new ResponseEntity<>(APIUtils.statusError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(description = "confirm token booking API")
    @PostMapping("/confirm-token-booking")
    public ResponseEntity<APIStandardResponseDTO<?>> confirmTokenBooking(
            @RequestHeader(value = "Authorization", required = false) String bearerToken, WebRequest request,
            @Valid @RequestBody APIStandardRequestDTO<ConfirmTokenBookingDTO> requestDTO) {

        APIStandardResponseDTO<Boolean> response = new APIStandardResponseDTO<>();
        String exchangeId = APIUtils.getExchangeId(StringUtils.EMPTY);
        response.setExchangeId(exchangeId);
        try {
            Locale locale = request.getLocale();
            System.out.println(locale);

            boolean isValid = healthCareService.confirmTokenBooking(requestDTO.getData());
            if (!isValid) {
                return new ResponseEntity<>(APIUtils.statusError(ResponseCode.ERROR_001), HttpStatus.INTERNAL_SERVER_ERROR);
            }

            response.setData(isValid);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            log.error("confirm token booking has error encountered {}", e.getMessage(), e);
            return new ResponseEntity<>(APIUtils.statusError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

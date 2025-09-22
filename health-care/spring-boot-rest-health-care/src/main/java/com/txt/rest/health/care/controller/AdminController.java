package com.txt.rest.health.care.controller;

import com.txt.rest.health.care.constant.Constants;
import com.txt.rest.health.care.dto.common.APIStandardRequestDTO;
import com.txt.rest.health.care.dto.common.APIStandardResponseDTO;
import com.txt.rest.health.care.dto.common.ResponseCode;
import com.txt.rest.health.care.dto.posgre.DoctorDTO;
import com.txt.rest.health.care.dto.posgre.MarkdownDTO;
import com.txt.rest.health.care.dto.request.DoctorRequestDTO;
import com.txt.rest.health.care.dto.request.MarkdownRequestDTO;
import com.txt.rest.health.care.dto.request.SaveScheduleDTO;
import com.txt.rest.health.care.service.AdminService;
import com.txt.rest.health.care.utils.APIUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.MDC;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@Tag(name = "Admin Controller", description = "Admin API")
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin")
public class AdminController {

    private final HttpServletRequest httpServletRequest;
    private final AdminService adminService;

    @Operation(description = "Save Markdown API")
    @PostMapping(path = "/markdown/save", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<APIStandardResponseDTO> saveMarkdown(
            @RequestBody APIStandardRequestDTO<MarkdownRequestDTO> requestDTO,
            @RequestHeader(value = "Authorization", required = false) String bearerToken
    ) {

        APIStandardResponseDTO<MarkdownDTO> response = new APIStandardResponseDTO<>();
        String exchangeId = APIUtils.getExchangeId(StringUtils.EMPTY);
        response.setExchangeId(exchangeId);
        try {
            MDC.put(Constants.TRACK_ID, exchangeId);
            log.info("URI: {}", httpServletRequest.getRequestURI());

            MarkdownDTO markdown = adminService.saveMarkdown(requestDTO.getData());
            if (Objects.isNull(markdown)) {
                return new ResponseEntity<>(APIUtils.statusError(ResponseCode.FAILED), HttpStatus.INTERNAL_SERVER_ERROR);
            }

            response.setData(markdown);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Save markdown has error encountered {}", e.getMessage(), e);
            return new ResponseEntity<>(APIUtils.statusError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(description = "Save Schedule Time API")
    @PostMapping(path = "/schedule-time/save", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<APIStandardResponseDTO> saveSchedule(
            @RequestBody APIStandardRequestDTO<SaveScheduleDTO> requestDTO,
            @RequestHeader(value = "Authorization", required = false) String bearerToken
    ) {

        APIStandardResponseDTO<MarkdownDTO> response = new APIStandardResponseDTO<>();
        String exchangeId = APIUtils.getExchangeId(StringUtils.EMPTY);
        response.setExchangeId(exchangeId);
        try {
            MDC.put(Constants.TRACK_ID, exchangeId);
            log.info("URI: {}", httpServletRequest.getRequestURI());

            boolean isSuccess = adminService.saveSchedule(requestDTO.getData());
            if (!isSuccess) {
                return new ResponseEntity<>(APIUtils.statusError(ResponseCode.FAILED), HttpStatus.INTERNAL_SERVER_ERROR);
            }

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Save markdown has error encountered {}", e.getMessage(), e);
            return new ResponseEntity<>(APIUtils.statusError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(description = "Save Doctor info API")
    @PostMapping(path = "/doctor-info/save", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<APIStandardResponseDTO> saveDoctorInfo(
            @RequestBody APIStandardRequestDTO<DoctorRequestDTO> requestDTO,
            @RequestHeader(value = "Authorization", required = false) String bearerToken
    ) {

        APIStandardResponseDTO<DoctorDTO> response = new APIStandardResponseDTO<>();
        String exchangeId = APIUtils.getExchangeId(StringUtils.EMPTY);
        response.setExchangeId(exchangeId);
        try {
            MDC.put(Constants.TRACK_ID, exchangeId);
            log.info("URI: {}", httpServletRequest.getRequestURI());

            boolean isSaveDoctor = adminService.saveDoctorInfo(requestDTO.getData());
            if (!isSaveDoctor) {
                return new ResponseEntity<>(APIUtils.statusError(ResponseCode.FAILED), HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Save markdown has error encountered {}", e.getMessage(), e);
            return new ResponseEntity<>(APIUtils.statusError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

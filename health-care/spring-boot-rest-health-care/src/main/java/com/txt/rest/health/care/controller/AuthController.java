package com.txt.rest.health.care.controller;

import com.txt.rest.health.care.constant.Constants;
import com.txt.rest.health.care.dto.posgre.UsersDTO;
import com.txt.rest.health.care.dto.common.APIPagingRequestDTO;
import com.txt.rest.health.care.dto.common.APIPagingResponseDTO;
import com.txt.rest.health.care.dto.common.APIStandardRequestDTO;
import com.txt.rest.health.care.dto.common.APIStandardResponseDTO;
import com.txt.rest.health.care.dto.request.AuthRequestDTO;
import com.txt.rest.health.care.dto.request.SearchRequestDTO;
import com.txt.rest.health.care.dto.request.UserRequestDTO;
import com.txt.rest.health.care.dto.request.UserUpdateDTO;
import com.txt.rest.health.care.dto.response.AuthResponseDTO;
import com.txt.rest.health.care.service.UserService;
import com.txt.rest.health.care.service.auth.JwtService;
import com.txt.rest.health.care.utils.APIUtils;
import com.txt.rest.health.care.utils.JwtUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.MDC;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@Tag(name = "Authentication Controller", description = "Authentication API")
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final HttpServletRequest httpServletRequest;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtService jwtService;


    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "description api"),
            @ApiResponse(responseCode = "400", description = "Bad request."),
            @ApiResponse(responseCode = "500", description = "Server error")})
    @Operation(description = "Generate token API")
    @PostMapping(path = "/generate-token", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<APIStandardResponseDTO> authenticateAndGetToken(
            @RequestHeader(value = "Authorization", required = false) String bearerToken,
            @RequestBody APIStandardRequestDTO<AuthRequestDTO> requestDTO) {

        APIStandardResponseDTO<AuthResponseDTO> response = new APIStandardResponseDTO<>();
        String exchangeId = APIUtils.getExchangeId(requestDTO.getExchangeId());
        response.setExchangeId(exchangeId);
        try {
            MDC.put(Constants.TRACK_ID, exchangeId);
            log.info("URI: {}", httpServletRequest.getRequestURI());

            AuthRequestDTO authRequest = requestDTO.getData();
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
            );

            if (authentication.isAuthenticated()) {
                String token = jwtService.generateToken(authRequest.getEmail());
                response.setData(AuthResponseDTO.builder().accessToken(token).build());
                return new ResponseEntity<>(response, HttpStatus.OK);
            }

            return new ResponseEntity<>(APIUtils.statusError("Invalid user request"), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            log.error("Generate token has error encountered {}", e.getMessage(), e);
            return new ResponseEntity<>(APIUtils.statusError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(description = "Add new user API")
    @PostMapping(path = "/add-user", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<APIStandardResponseDTO> addNewUser(
            @RequestHeader(value = "Authorization", required = false) String bearerToken,
            @RequestBody APIStandardRequestDTO<UserRequestDTO> requestDTO) {

        APIStandardResponseDTO<UsersDTO> response = new APIStandardResponseDTO<>();
        String exchangeId = APIUtils.getExchangeId(requestDTO.getExchangeId());
        response.setExchangeId(exchangeId);
        try {
            MDC.put(Constants.TRACK_ID, exchangeId);
            log.info("URI: {}", httpServletRequest.getRequestURI());

            UsersDTO dto = userService.addUser(requestDTO.getData());
            if (ObjectUtils.isEmpty(dto)) {
                return new ResponseEntity<>(APIUtils.statusError("Invalid user request"), HttpStatus.BAD_REQUEST);
            }
            response.setData(dto);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Add user has error encountered {}", e.getMessage(), e);
            return new ResponseEntity<>(APIUtils.statusError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(description = "Update user API")
    @PutMapping(path = "/update-user", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<APIStandardResponseDTO> updateUser(
            @RequestHeader(value = "Authorization", required = false) String bearerToken,
            @RequestBody APIStandardRequestDTO<UserUpdateDTO> requestDTO) {

        APIStandardResponseDTO<UsersDTO> response = new APIStandardResponseDTO<>();
        String exchangeId = APIUtils.getExchangeId(requestDTO.getExchangeId());
        response.setExchangeId(exchangeId);
        try {
            MDC.put(Constants.TRACK_ID, exchangeId);
            log.info("URI: {}", httpServletRequest.getRequestURI());

            UsersDTO dto = userService.updateUser(requestDTO.getData());
            response.setData(dto);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Update user has error encountered {}", e.getMessage(), e);
            return new ResponseEntity<>(APIUtils.statusError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(description = "Delete user API")
    @DeleteMapping(path = "/delete-user/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<APIStandardResponseDTO> deleteUser(
            @RequestHeader(value = "Authorization", required = false) String bearerToken,
            @PathVariable(value = "userId") Long userId) {

        APIStandardResponseDTO<UsersDTO> response = new APIStandardResponseDTO<>();
        String exchangeId = APIUtils.getExchangeId(StringUtils.EMPTY);
        response.setExchangeId(exchangeId);
        try {
            MDC.put(Constants.TRACK_ID, exchangeId);
            log.info("URI: {}", httpServletRequest.getRequestURI());

            boolean isDelete = userService.deleteUser(userId);
            if (isDelete) {
                return new ResponseEntity<>(response, HttpStatus.OK);
            }
            return new ResponseEntity<>(APIUtils.statusError("Delete user failed"), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            log.error("Update user has error encountered {}", e.getMessage(), e);
            return new ResponseEntity<>(APIUtils.statusError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(description = "List user API")
    @PostMapping(path = "/list-user", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<APIStandardResponseDTO<APIPagingResponseDTO>> getPagingListUser(
            @RequestHeader(value = "Authorization", required = false) String bearerToken,
            @RequestBody APIPagingRequestDTO<SearchRequestDTO> requestDTO) {

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

    @Operation(description = "Get user by id API")
    @GetMapping(path = "/user/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<APIStandardResponseDTO> getUserById(
            @RequestHeader(value = "Authorization", required = false) String bearerToken,
            @PathVariable(value = "userId") Long userId) {

        APIStandardResponseDTO<UsersDTO> response = new APIStandardResponseDTO<>();
        String exchangeId = APIUtils.getExchangeId(StringUtils.EMPTY);
        response.setExchangeId(exchangeId);
        try {
            MDC.put(Constants.TRACK_ID, exchangeId);
            log.info("URI: {}", httpServletRequest.getRequestURI());

            response.setData(userService.getUser(userId));
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Get user by id has error encountered {}", e.getMessage(), e);
            return new ResponseEntity<>(APIUtils.statusError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Operation(description = "Get user info API")
    @GetMapping(path = "/user-info", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<APIStandardResponseDTO> getUserInfo(
            @RequestHeader(value = "Authorization", required = false) String bearerToken) {

        APIStandardResponseDTO<UsersDTO> response = new APIStandardResponseDTO<>();
        String exchangeId = APIUtils.getExchangeId(StringUtils.EMPTY);
        response.setExchangeId(exchangeId);
        try {
            MDC.put(Constants.TRACK_ID, exchangeId);
            log.info("URI: {}", httpServletRequest.getRequestURI());

            String email = JwtUtils.getUsername(bearerToken);
            response.setData(userService.getUserInfo(email));
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Get user by id has error encountered {}", e.getMessage(), e);
            return new ResponseEntity<>(APIUtils.statusError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

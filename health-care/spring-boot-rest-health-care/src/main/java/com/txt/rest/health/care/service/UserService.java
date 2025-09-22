package com.txt.rest.health.care.service;

import com.txt.rest.health.care.dto.posgre.UsersDTO;
import com.txt.rest.health.care.dto.common.APIPagingRequestDTO;
import com.txt.rest.health.care.dto.common.APIPagingResponseDTO;
import com.txt.rest.health.care.dto.request.SearchRequestDTO;
import com.txt.rest.health.care.dto.request.UserRequestDTO;
import com.txt.rest.health.care.dto.request.UserUpdateDTO;

public interface UserService {
    UsersDTO addUser(UserRequestDTO usersDTO);

    UsersDTO updateUser(UserUpdateDTO usersDTO);

    boolean deleteUser(Long userId);

    APIPagingResponseDTO<UsersDTO> getPagingListUser(APIPagingRequestDTO<SearchRequestDTO> requestDTO);

    UsersDTO getUser(Long userId);

    UsersDTO getUserInfo(String email);

}
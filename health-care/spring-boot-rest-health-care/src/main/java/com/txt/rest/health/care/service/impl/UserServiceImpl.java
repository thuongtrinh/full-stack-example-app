package com.txt.rest.health.care.service.impl;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import com.txt.rest.health.care.constant.Constants;
import com.txt.rest.health.care.constant.Roles;
import com.txt.rest.health.care.dto.common.APIPagingRequestDTO;
import com.txt.rest.health.care.dto.common.APIPagingResponseDTO;
import com.txt.rest.health.care.dto.common.PaginationResponse;
import com.txt.rest.health.care.dto.posgre.UsersDTO;
import com.txt.rest.health.care.dto.request.SearchRequestDTO;
import com.txt.rest.health.care.dto.request.UserRequestDTO;
import com.txt.rest.health.care.dto.request.UserUpdateDTO;
import com.txt.rest.health.care.entity.postgres.AllCode;
import com.txt.rest.health.care.entity.postgres.QUsers;
import com.txt.rest.health.care.entity.postgres.Users;
import com.txt.rest.health.care.mapper.AllCodeMapper;
import com.txt.rest.health.care.mapper.UserMapper;
import com.txt.rest.health.care.repository.postgres.AllCodeRepository;
import com.txt.rest.health.care.repository.postgres.UsersRepository;
import com.txt.rest.health.care.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final PasswordEncoder passwordEncoder;
    private final UsersRepository usersRepository;
    private final AllCodeRepository allCodeRepository;
    private final UserMapper userMapper;
    private final AllCodeMapper allCodeMapper;

    @Override
    public UsersDTO addUser(UserRequestDTO requestDTO) {
        log.info("Adding user: {}", requestDTO);

        boolean isValid = isValidateUserKey(requestDTO.getRole(), requestDTO.getPosition());
        if (!isValid) {
            log.error("Adding user with request data reference key invalid: {}", requestDTO);
            return null;
        }

        UsersDTO usersDTO = new UsersDTO();
        BeanUtils.copyProperties(requestDTO, usersDTO);
        if (StringUtils.isNoneBlank(usersDTO.getPassword())) {
            usersDTO.setPassword(passwordEncoder.encode(usersDTO.getPassword()));
        }
        usersDTO.setCreatedDate(LocalDateTime.now());
        usersDTO.setUpdatedDate(LocalDateTime.now());
        usersDTO.setRoleKey(requestDTO.getRole());
        usersDTO.setPositionKey(requestDTO.getPosition());
        Users userResult = usersRepository.save(userMapper.toEntity(usersDTO));
        userResult.setPassword(null);
        return userMapper.toDTO(userResult);
    }

    @Override
    public UsersDTO updateUser(UserUpdateDTO usersDTO) {
        log.info("Updating user: {}", usersDTO);
        Optional<Users> usersOptional = usersRepository.findById(usersDTO.getId());
        if (usersOptional.isEmpty()) {
            log.error("Updating userId: {} not found", usersDTO);
            return null;
        }

        boolean isValid = isValidateUserKey(usersDTO.getRole(), usersDTO.getPosition());
        if (!isValid) {
            log.error("Updating user with request data reference key invalid: {}", usersDTO);
            return null;
        }

        Users users = usersOptional.get();
        users.setUpdatedDate(LocalDateTime.now());
        users.setFirstName(usersDTO.getFirstName());
        users.setLastName(usersDTO.getLastName());
        users.setAddress(usersDTO.getAddress());
        users.setPhoneNumber(usersDTO.getPhoneNumber());
        users.setGender(usersDTO.getGender());
        users.setPositionKey(usersDTO.getPosition());
        users.setRoleKey(usersDTO.getRole());

        Users userResult = usersRepository.save(users);
        return userMapper.toDTO(userResult);
    }

    @Override
    public boolean deleteUser(Long userId) {
        log.info("Deleting user: {}", userId);
        Optional<Users> usersOptional = usersRepository.findById(userId);
        if (usersOptional.isEmpty()) {
            log.error("Deleting userId: {} not found", userId);
            return false;
        }
        usersRepository.deleteById(userId);
        return true;
    }

    @Override
    public APIPagingResponseDTO<UsersDTO> getPagingListUser(APIPagingRequestDTO<SearchRequestDTO> requestDTO) {
        APIPagingResponseDTO<UsersDTO> responseDTO = new APIPagingResponseDTO<>();

        SearchRequestDTO searchDTO = requestDTO.getData();
        Predicate predicate = createPredicateSearchUser(searchDTO);

        Sort sort = Sort.by("createdDate").descending();
        if (ObjectUtils.isNotEmpty(requestDTO.getOrders()) && requestDTO.getOrders().stream().filter(StringUtils::isBlank).count() == 0) {
            sort = Sort.by(requestDTO.getOrders().toArray(new String[0])).descending();
            if (requestDTO.getSort().equalsIgnoreCase(Constants.ORDER_ASC)) {
                sort = Sort.by(requestDTO.getOrders().toArray(new String[0])).ascending();
            }
        }

        Page<Users> usersPage = usersRepository.findAll(predicate, PageRequest.of(requestDTO.getPageIndex(), requestDTO.getSizePage(), sort));
        if (usersPage.getContent().isEmpty()) {
            log.warn("getPagingListUser not found users: {}", searchDTO);
        }

        List<UsersDTO> usersDTOs = usersPage.getContent().stream().map(user -> {
            UsersDTO usersDTO = userMapper.toDTO(user);
            usersDTO.setPassword(null);
            setPositionAndRole(user, usersDTO);

            return usersDTO;
        }).toList();

        PaginationResponse paginationResponse = new PaginationResponse<>(usersDTOs, requestDTO.getPageIndex(), requestDTO.getSizePage());
        paginationResponse.setOrders(requestDTO.getOrders());
        paginationResponse.setSort(requestDTO.getSort());
        responseDTO.setPaging(paginationResponse);
        responseDTO.setRecords(usersDTOs);
        return responseDTO;
    }

    private void setPositionAndRole(Users user, UsersDTO usersDTO) {
        if (ObjectUtils.isNotEmpty(user.getAllCodeRole())) {
            usersDTO.setRole(allCodeMapper.toDTO(user.getAllCodeRole()));
        }
        if (ObjectUtils.isNotEmpty(user.getAllCodePosition())) {
            usersDTO.setPosition(allCodeMapper.toDTO(user.getAllCodePosition()));
        }
    }

    @Override
    public UsersDTO getUser(Long userId) {
        log.info("Get user by id: {}", userId);
        Optional<Users> usersOptional = usersRepository.findById(userId);
        if (usersOptional.isEmpty()) {
            log.error("Get by id: {} not found", userId);
            return null;
        }

        Users userEntity = usersOptional.get();
        UsersDTO usersDTO = userMapper.toDTO(userEntity);
        setPositionAndRole(userEntity, usersDTO);
        usersDTO.setPassword(null);

        return usersDTO;
    }

    @Override
    public UsersDTO getUserInfo(String email) {
        log.info("Get user info by email: {}", email);
        Users user = usersRepository.findByEmail(email);
        if (ObjectUtils.isEmpty(user)) {
            log.error("Get user info by email: {} not found", email);
            return null;
        }

        UsersDTO usersDTO = userMapper.toDTO(user);
        usersDTO.setId(user.getId());
        usersDTO.setPassword(null);
        usersDTO.setCreatedDate(null);
        usersDTO.setUpdatedDate(null);
        usersDTO.setPositionKey(null);
        usersDTO.setImage(null);
        return usersDTO;
    }

    private Predicate createPredicateSearchUser(SearchRequestDTO searchDTO) {
        QUsers qUsers = QUsers.users;
        BooleanBuilder predicate = new BooleanBuilder();
        if (StringUtils.isNoneBlank(searchDTO.getEmail())) {
            predicate.and(qUsers.email.like(Constants.SEARCH_LIKE + searchDTO.getEmail() + Constants.SEARCH_LIKE));
        }
        if (StringUtils.isNoneBlank(searchDTO.getFirstName())) {
            predicate.and(qUsers.firstName.like(Constants.SEARCH_LIKE + searchDTO.getFirstName() + Constants.SEARCH_LIKE));
        }
        if (StringUtils.isNoneBlank(searchDTO.getLastName())) {
            predicate.and(qUsers.lastName.like(Constants.SEARCH_LIKE + searchDTO.getLastName() + Constants.SEARCH_LIKE));
        }
        if (StringUtils.isNoneBlank(searchDTO.getAddress())) {
            predicate.and(qUsers.address.like(Constants.SEARCH_LIKE + searchDTO.getAddress() + Constants.SEARCH_LIKE));
        }
        if (StringUtils.isNoneBlank(searchDTO.getPhoneNumber())) {
            predicate.and(qUsers.phoneNumber.like(Constants.SEARCH_LIKE + searchDTO.getPhoneNumber() + Constants.SEARCH_LIKE));
        }
        if (StringUtils.isNoneBlank(searchDTO.getGender())) {
            predicate.and(qUsers.gender.eq(searchDTO.getGender()));
        }
        if (StringUtils.isNoneBlank(searchDTO.getRole())) {
            predicate.and(qUsers.roleKey.eq(searchDTO.getRole()));
        }
        if (StringUtils.isNoneBlank(searchDTO.getPosition())) {
            predicate.and(qUsers.positionKey.eq(searchDTO.getPosition()));
        }
        return predicate;
    }

    private boolean isValidateUserKey(String roleKey, String positionKey) {
        if (StringUtils.isNoneBlank(roleKey)) {
            Roles role = Roles.getRoles(roleKey);
            if (ObjectUtils.isEmpty(role)) {
                log.error("Adding user with request role invalid roleKey: {}", roleKey);
                return false;
            }
            AllCode allCode = allCodeRepository.findFirstByTypeAndKey(Constants.TypeRole.ROLE, role.getCode());
            if (ObjectUtils.isEmpty(allCode)) {
                log.error("Adding user not found config roleKey {}", roleKey);
                return false;
            }
        }

        if (StringUtils.isNoneBlank(positionKey)) {
            AllCode allCode = allCodeRepository.findFirstByTypeAndKey(Constants.TypeRole.POSITION, positionKey);
            if (ObjectUtils.isEmpty(allCode)) {
                log.error("Adding user not found config positionKey {}", positionKey);
                return false;
            }
        }
        return true;
    }

}

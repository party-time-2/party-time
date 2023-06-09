package com.partytime.api.controller;

import com.partytime.api.dto.account.AccountDTO;
import com.partytime.api.dto.account.AccountRegisterDTO;
import com.partytime.api.dto.changepassword.ChangePasswordDTO;
import com.partytime.api.dto.login.LoginRequestDTO;
import com.partytime.api.dto.login.LoginResponseDTO;
import com.partytime.base.TestBase;
import com.partytime.service.AccountService;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.assertThat;

class AuthControllerTest extends TestBase {

    public static final String MAIL = "test@user.de";
    public static final String NAME = "Test User";
    public static final String STANDARD_TEST_PASSWORD  = "Hallo123!party";
    @Autowired
    AccountService accountService;

    public AuthControllerTest() {
        super("auth");
    }

    @Test
    @Order(1)
    void registerNormal() {
        ResponseEntity<AccountDTO> response = executeRegister();

        assertThat(response.getStatusCode())
            .isEqualTo(HttpStatus.OK);
        assertThat(response.getBody())
            .satisfies(
                accountDTO -> assertThat(accountDTO.getEmail()).isEqualTo(MAIL),
                accountDTO -> assertThat(accountDTO.getName()).isEqualTo(NAME)
            );
    }

    @Test
    @Order(2)
    void registerAlreadyExists() {
        ResponseEntity<AccountDTO> response = executeRegister();
        assertThat(response.getStatusCode())
            .isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    @Order(3)
    void verifyMail() {
        String code = accountService.getAccount(MAIL)
            .getEmailVerificationCode();

        ResponseEntity<Void> response = executePostRequest("/verify/" + code, HttpEntity.EMPTY, Void.class);
        assertThat(response.getStatusCode())
            .isEqualTo(HttpStatus.OK);
    }

    @Test
    @Order(4)
    void verifyMailFail() {
        ResponseEntity<Void> response = executePostRequest("/verify/10938425z4tu9hefowdjsia", HttpEntity.EMPTY, Void.class);
        assertThat(response.getStatusCode())
            .isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    @Order(5)
    void login() {
        LoginRequestDTO loginRequestDTO = LoginRequestDTO.builder()
            .email("verified1@partytime.de")
            .password(STANDARD_TEST_PASSWORD )
            .build();
        ResponseEntity<LoginResponseDTO> response = executePostRequest("/login", new HttpEntity<>(loginRequestDTO), LoginResponseDTO.class);
        assertThat(response.getStatusCode())
            .isEqualTo(HttpStatus.OK);
    }

    @Test
    @Order(6)
    void loginAccountNotExists() {
        LoginRequestDTO loginRequestDTO = LoginRequestDTO.builder()
            .email("notexists@partytime.de")
            .password(STANDARD_TEST_PASSWORD )
            .build();
        ResponseEntity<LoginResponseDTO> response = executePostRequest("/login", new HttpEntity<>(loginRequestDTO), LoginResponseDTO.class);
        assertThat(response.getStatusCode())
            .isEqualTo(HttpStatus.NOT_FOUND);
    }

    @Test
    @Order(7)
    void loginNotVerified() {
        LoginRequestDTO loginRequestDTO = LoginRequestDTO.builder()
            .email("not_verified1@partytime.de")
            .password(STANDARD_TEST_PASSWORD )
            .build();
        ResponseEntity<LoginResponseDTO> response = executePostRequest("/login", new HttpEntity<>(loginRequestDTO), LoginResponseDTO.class);
        assertThat(response.getStatusCode())
            .isEqualTo(HttpStatus.FORBIDDEN);
    }

    @Test
    @Order(8)
    void testChangePassword() {
        authAsUser("verified1@partytime.de");
        ResponseEntity<Void> response = executePostRequest("/change", new HttpEntity<>(ChangePasswordDTO.builder()
            .oldPassword(STANDARD_TEST_PASSWORD )
            .newPassword(STANDARD_TEST_PASSWORD  + "time")
            .build()), Void.class);
        assertThat(response.getStatusCode())
            .isEqualTo(HttpStatus.OK);
    }

    @Test
    @Order(9)
    void testChangePasswordOldWrong() {
        authAsUser("verified1@partytime.de");
        ResponseEntity<Void> response = executePostRequest("/change", new HttpEntity<>(ChangePasswordDTO.builder()
            .oldPassword(STANDARD_TEST_PASSWORD  + "FALSE")
            .newPassword(STANDARD_TEST_PASSWORD  + "time")
            .build()), Void.class);
        assertThat(response.getStatusCode())
            .isEqualTo(HttpStatus.UNAUTHORIZED);
    }

    @Test
    @Order(10)
    void testChangePasswordNewPasswordNotStandard() {
        authAsUser("verified1@partytime.de");
        ResponseEntity<Void> response = executePostRequest("/change", new HttpEntity<>(ChangePasswordDTO.builder()
            .oldPassword(STANDARD_TEST_PASSWORD )
            .newPassword("time")
            .build()), Void.class);
        assertThat(response.getStatusCode())
            .isEqualTo(HttpStatus.CONFLICT);
    }

    private ResponseEntity<AccountDTO> executeRegister() {
        AccountRegisterDTO registerDTO = AccountRegisterDTO.builder()
            .name(NAME)
            .email(MAIL)
            .password("Password123!a")
            .build();
        return executePostRequest("/register", new HttpEntity<>(registerDTO), AccountDTO.class);
    }

}

package com.partytime.service

import com.partytime.api.dto.changepassword.ChangePasswordDTO
import com.partytime.api.error.ApiError
import com.partytime.api.error.ApiErrorException
import com.partytime.api.error.asException
import com.partytime.assertApiErrorExceptionEquals
import com.partytime.configuration.PartyTimeConfigurationProperties
import com.partytime.configuration.security.PartyTimeUserDetails
import com.partytime.configuration.security.TokenAuthentication
import com.partytime.jpa.entity.Account
import com.partytime.jpa.repository.AccountRepository
import com.partytime.testAbstraction.UnitTest
import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Test
import org.springframework.context.ApplicationEventPublisher
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder

class AuthServiceTest : UnitTest() {
    private val accountService = mockk<AccountService>()
    private val accountRepository = mockk<AccountRepository>()
    private val passwordEncoder = BCryptPasswordEncoder()
    private val jwtService = mockk<JwtService>()
    private val configurationProperties = mockk<PartyTimeConfigurationProperties>()
    private val applicationEventPublisher = mockk<ApplicationEventPublisher>()

    //AuthService
    private val authService = AuthService(
        accountService,
        accountRepository,
        passwordEncoder,
        jwtService,
        configurationProperties,
        applicationEventPublisher
    )

    private val eMail = "example@example.com"
    private val testPassword = "Abc!def5ghi"
    private val testAccount = Account(eMail, true, "Example Example", passwordEncoder.encode(testPassword))


    @Test
    fun registerAccount() {
        TODO()
    }

    @Test
    fun verifyAccount() {
        TODO()
    }

    @Test
    fun loginUser() {
        TODO()
    }

    @Test
    fun changePasswordSuccess() {
        val changePasswordDTO = ChangePasswordDTO(
            testPassword,
            "Jkl?mno2pqr"
        )

        val partyTimeUserDetails = PartyTimeUserDetails(testAccount)
        val authentication = TokenAuthentication(partyTimeUserDetails)

        every { accountService.getAccount(eMail) } returns testAccount

        val changedAccount = Account(
            testAccount.email,
            testAccount.emailVerified,
            testAccount.name,
            passwordEncoder.encode(changePasswordDTO.newPassword)
        )

        every { accountRepository.save(changedAccount) } returns changedAccount

        authService.changePassword(changePasswordDTO, authentication)

        verify(exactly = 1) { accountService.getAccount(eMail) }
        verify(exactly = 1) { accountRepository.save(changedAccount) }
    }

    @Test
    fun changePasswordUnauthorized() {
        val changePasswordDTO = ChangePasswordDTO(
            "wrong!Password5unauthorized",
            "Jkl?mno2pqr"
        )
        val partyTimeUserDetails = PartyTimeUserDetails(testAccount)
        val authentication = TokenAuthentication(partyTimeUserDetails)

        every { accountService.getAccount(eMail) } returns testAccount

        val thrownException = org.junit.jupiter.api.assertThrows<ApiErrorException> {
            authService.changePassword(changePasswordDTO, authentication)
        }

        val expectedException = ApiError.unauthorized().asException()
        assertApiErrorExceptionEquals(expectedException, thrownException)

        verify(exactly = 1) { accountService.getAccount(eMail) }
    }
}

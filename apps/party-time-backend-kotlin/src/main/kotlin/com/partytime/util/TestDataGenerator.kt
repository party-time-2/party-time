package com.partytime.util

import com.partytime.api.dto.login.LoginRequestDTO
import com.partytime.jpa.entity.Account
import com.partytime.jpa.entity.Event
import com.partytime.jpa.repository.AccountRepository
import com.partytime.jpa.repository.EventRepository
import com.partytime.service.AddressService
import com.partytime.service.AuthService
import io.github.oshai.kotlinlogging.KotlinLogging
import org.springframework.boot.ApplicationArguments
import org.springframework.boot.ApplicationRunner
import org.springframework.context.annotation.Profile
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Component
import java.time.LocalDateTime
import java.util.UUID

private val testDataLogger = KotlinLogging.logger {}

@Component
@Profile("!prod")
class TestDataGenerator(
    private val accountRepository: AccountRepository,
    private val eventRepository: EventRepository,
    val addressService: AddressService,
    val passwordEncoder: PasswordEncoder,
    val authService: AuthService
) : ApplicationRunner {
    companion object {
        const val DEBUG_PASSWORD: String = "Hallo123!party"
    }

    override fun run(args: ApplicationArguments?) {
        createAccount("Verified User 1", "verified1@partytime.de", true)
        createAccount("Verified User 2", "verified2@partytime.de", true)
        createAccount("Verified User 3", "verified3@partytime.de", true)
        createAccount("Verified User 4", "verified4@partytime.de", true)

        createAccount("Not Verified User 1", "not_verified1@partytime.de", false)
        createAccount("Not Verified User 2", "not_verified2@partytime.de", false)
        createAccount("Not Verified User 3", "not_verified3@partytime.de", false)
        createAccount("Not Verified User 4", "not_verified4@partytime.de", false)

        createEvent("Test Event 1", 1)
        createEvent("Test Event 2", 2)
        createEvent("Test Event 3", 3)
        createEvent("Test Event 4", 4)

        createEvent("Test Event 5", 1)
        createEvent("Test Event 6", 2)
        createEvent("Test Event 7", 3)
        createEvent("Test Event 8", 4)
    }

    /**
     * Implements F002
     */
    fun createEvent(name: String, rand: Int) {
        if (!eventRepository.existsByName(name)) {
            eventRepository.save(
                Event(
                    accountRepository.findAccountByEmail("verified$rand@partytime.de").orElseThrow(),
                    name,
                    LocalDateTime.now().plusMonths(3),
                    addressService.saveAddress(
                        "Teststraße $rand",
                        null,
                        rand.toString() + "0000",
                        "Teststadt",
                        "Testland"
                    )
                )
            )
        }
    }

    /**
     * Implements F011
     */
    // Test Data not used in Production
    private fun createAccount(name: String, email: String, verified: Boolean) {
        if (!accountRepository.existsByEmail(email)) {
            val account = Account(
                email,
                verified,
                name,
                passwordEncoder.encode(DEBUG_PASSWORD)
            )
            if (!verified) {
                account.emailVerificationCode = UUID.randomUUID().toString()
            }
            accountRepository.save(account)
            testDataLogger.info {
                "Created a ${if (verified) "verified" else "not verified"} Test Account with Email $email"
            }
        }
        if (verified) {
            // TODO Remove me before Abgabe
            val response = authService.loginUser(
                LoginRequestDTO(
                    email,
                    DEBUG_PASSWORD
                )
            )
            testDataLogger.info { "Token for $email:\n ${response.token}" }
        }
    }
}

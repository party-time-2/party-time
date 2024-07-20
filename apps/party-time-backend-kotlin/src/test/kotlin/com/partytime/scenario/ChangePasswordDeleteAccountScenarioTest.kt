package com.partytime.scenario

import com.partytime.PASSWORD
import com.partytime.TO_DELETE_VERIFIED_EMAIL
import com.partytime.api.dto.account.AccountDeleteDTO
import com.partytime.api.dto.changepassword.ChangePasswordDTO
import com.partytime.testAbstraction.PartyTimeWebTestClients
import com.partytime.testAbstraction.ScenarioTest
import com.partytime.util.TestDataGenerator
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpMethod

class ChangePasswordDeleteAccountScenarioTest @Autowired constructor(
    private val wtc: PartyTimeWebTestClients
) : ScenarioTest() {

    @Test
    fun testChangePasswordDeleteAccount() {
        val accountWebTestClient = wtc.authenticatedClientByEmail(TO_DELETE_VERIFIED_EMAIL)

        //Change password
        val changePasswordDTO = ChangePasswordDTO(
            TestDataGenerator.DEBUG_PASSWORD,
            PASSWORD
        )

        accountWebTestClient
            .post()
            .uri("/api/account/pwchange")
            .bodyValue(changePasswordDTO)
            .exchange()
            .expectStatus().isOk

        //delete account
        val accountDeleteDTO = AccountDeleteDTO(
            PASSWORD
        )

        accountWebTestClient
            .method(HttpMethod.DELETE) //
            .uri("/api/account")
            .bodyValue(accountDeleteDTO)
            .exchange()
            .expectStatus().isOk
    }
}

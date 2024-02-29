package com.partytime.testAbstraction

import io.mockk.junit5.MockKExtension
import org.junit.jupiter.api.extension.ExtendWith


@ExtendWith(MockKExtension::class)
@MockKExtension.CheckUnnecessaryStub
@MockKExtension.ConfirmVerification
abstract class UnitTest

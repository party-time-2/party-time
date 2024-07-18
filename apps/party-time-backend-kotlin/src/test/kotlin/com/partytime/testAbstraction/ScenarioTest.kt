package com.partytime.testAbstraction

import org.springframework.boot.test.context.SpringBootTest
import org.springframework.context.annotation.Import
import org.springframework.test.context.event.RecordApplicationEvents

@SpringBootTest
@Import(value = [PartyTimeWebTestClients::class])
@RecordApplicationEvents
abstract class ScenarioTest

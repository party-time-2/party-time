package com.partytime

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class PartyTimeBackendKotlinApplication

fun main(args: Array<String>) {
	runApplication<PartyTimeBackendKotlinApplication>(*args)
}

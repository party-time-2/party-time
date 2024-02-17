package com.partytime.jpa.repository

import com.partytime.jpa.entity.EventParticipant
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.Optional

@Repository
interface EventParticipantRepository: JpaRepository<EventParticipant, Long> {

    fun existsByEvent_IdAndAccount_Id(eventId: Long, accountId: Long): Boolean
    fun findByEvent_IdAndAccount_Id(eventId: Long, accountId: Long): Optional<EventParticipant>
    fun findByEvent_IdAndAccount_Email(eventId: Long, email: String): Optional<EventParticipant>
    fun findAllByAccount_Email(email: String): List<EventParticipant>
}

package com.partytime.jpa.repository

import com.partytime.jpa.entity.Invitation
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.Optional

@Repository
interface InvitationRepository: JpaRepository<Invitation, Long> {
    fun existsByEvent_IdAndAccount_Id(eventId: Long, accountId: Long): Boolean
    fun findByEvent_IdAndAccount_Id(eventId: Long, accountId: Long): Optional<Invitation>
    fun findByEvent_IdAndId(eventId: Long, id: Long): Optional<Invitation>
    fun findAllByAccount_Email(email: String): List<Invitation>
}

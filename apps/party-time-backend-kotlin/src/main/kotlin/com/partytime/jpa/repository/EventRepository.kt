package com.partytime.jpa.repository

import com.partytime.jpa.entity.Event
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface EventRepository: JpaRepository<Event, Long> {
    fun existsByName(name: String?): Boolean
    fun findByOrganizer_Email(email: String): List<Event>
}

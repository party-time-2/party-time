package com.partytime.jpa.repository;

import com.partytime.jpa.entity.EventParticipant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventParticipantRepository extends JpaRepository<EventParticipant, Long> {
    boolean existsByEvent_IdAndAccount_Id(Long eventId, Long accountId);
}

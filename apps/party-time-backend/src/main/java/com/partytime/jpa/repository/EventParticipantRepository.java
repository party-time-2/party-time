package com.partytime.jpa.repository;

import com.partytime.jpa.entity.EventParticipant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EventParticipantRepository extends JpaRepository<EventParticipant, Long> {
    boolean existsByEvent_IdAndAccount_Id(Long eventId, Long accountId);
    Optional<EventParticipant> findByEvent_IdAndAccount_Id(Long eventId, Long accountId);
}

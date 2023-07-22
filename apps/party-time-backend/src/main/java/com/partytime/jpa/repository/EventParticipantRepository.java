package com.partytime.jpa.repository;

import com.partytime.jpa.entity.EventParticipant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

public interface EventParticipantRepository extends JpaRepository<EventParticipant, Long> {
    boolean existsByEvent_IdAndAccount_Id(Long eventId, Long accountId);
    Optional<EventParticipant> findByEvent_IdAndAccount_Id(Long eventId, Long accountId);
    Optional<EventParticipant> findByEvent_IdAndAccount_Email(Long eventId, String email);
    Stream<EventParticipant> streamAllByAccount_Email(String email);

}

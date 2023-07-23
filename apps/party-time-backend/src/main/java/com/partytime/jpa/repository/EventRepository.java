package com.partytime.jpa.repository;

import com.partytime.jpa.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    boolean existsByName(String name);
    List<Event> findByOrganizer_Email(String email);



}

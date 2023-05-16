package com.partytime.jpa.repository;

import com.partytime.jpa.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
}

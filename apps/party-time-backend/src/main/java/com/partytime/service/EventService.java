package com.partytime.service;

import com.partytime.api.dto.event.EventCreateDTO;
import com.partytime.api.dto.event.EventDTO;
import com.partytime.api.error.ApiError;
import com.partytime.jpa.entity.Account;
import com.partytime.jpa.entity.Address;
import com.partytime.jpa.entity.Event;
import com.partytime.jpa.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final AccountService accountService;
    private final AddressService addressService;

    /**
     * Implements F001
     */
    @Transactional
    public Event createEvent(EventCreateDTO body, String email) {
        Account account = accountService.optAccount(email)
            .orElseThrow(() -> ApiError.badRequest("Ein Account mit dieser Mail existiert nicht").asException());

        Address address = addressService.getAddress(body.getAddress());

        Event event = Event.builder()
            .name(body.getName())
            .dateTime(body.getDateTime())
            .organizer(account)
            .address(address)
            .build();

        return eventRepository.save(event);
    }

    /**
     * Implements F016
     */
    public Event getEvent(String email, Long id) {
        Event event = eventRepository.findById(id)
            .orElseThrow(() -> ApiError.notFound("Ein Event mit der ID " + id + " konnte nicht gefunden werden.").asException());

        if (!email.equals(event.getOrganizer().getEmail())) {
            // Authenticated User is not Event Organizer
            throw ApiError.forbidden().asException();
        }
        // return event where id = id and organizer = email
        return event;
    }

    /**
     * Implements F016
     */
    public List<Event> getEvents(String email) {
        return eventRepository.findByOrganizer_Email(email);
    }

    /**
     * Implements F002
     */
    @Transactional
    public Event updateEvent(EventDTO body, String email) {
        Event originalEvent = precheckExistsAndOwnEvent(body.getId(), email);

        originalEvent.setAddress(addressService.getAddress(body.getAddress()));
        originalEvent.setName(body.getName());
        originalEvent.setDateTime(body.getDateTime());

        return eventRepository.save(originalEvent);
    }

    /**
     * Implements F003
     */
    @Transactional
    public void deleteEvent(Long eventId, String email) {
        Event originalEvent = precheckExistsAndOwnEvent(eventId, email);
        eventRepository.delete(originalEvent);
    }

    private Event precheckExistsAndOwnEvent(Long eventId, String email) {
        Event originalEvent = eventRepository.findById(eventId)
            .orElseThrow(() -> ApiError.notFound("Ein Event mit der ID " + eventId + " konnte nicht gefunden werden.").asException());

        if (!email.equals(originalEvent.getOrganizer().getEmail())) {
            // Authenticated User is not Event Organizer
            throw ApiError.forbidden().asException();
        }
        return originalEvent;
    }
}

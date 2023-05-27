package com.partytime.service;

import com.partytime.api.dto.event.EventCreateDTO;
import com.partytime.api.dto.event.EventDTO;
import com.partytime.api.error.ApiError;
import com.partytime.configuration.PartyTimeConfigurationProperties;
import com.partytime.jpa.entity.*;
import com.partytime.jpa.repository.EventParticipantRepository;
import com.partytime.jpa.repository.EventRepository;
import com.partytime.mail.MailService;
import com.partytime.mail.model.invite.InvitationData;
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
    private final EventParticipantRepository eventParticipantRepository;

    private final AccountService accountService;
    private final AddressService addressService;
    private final MailService mailService;

    private final PartyTimeConfigurationProperties configurationProperties;

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
    public void deleteEventById(Long eventId, String email) {
        Event originalEvent = precheckExistsAndOwnEvent(eventId, email);
        eventRepository.delete(originalEvent);
    }

    @Transactional
    public void deleteMultipleEvents(List<Event> events) {
        eventRepository.deleteAll(events);
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

    @Transactional
    public void inviteParticipant(Long eventId, String targetEmail, String authenticatedUser) {
        Event originalEvent = precheckExistsAndOwnEvent(eventId, authenticatedUser);
        Account invitedAccount = accountService.getAccount(targetEmail);

        if (eventParticipantRepository.existsByEvent_IdAndAccount_Id(eventId, invitedAccount.getId())) {
            throw ApiError.badRequest("Der Account mit der Email " + targetEmail + " wurde bereits eingeladen").asException();
        }

        EventParticipant participant = EventParticipant.builder()
            .account(invitedAccount)
            .event(originalEvent)
            .status(Status.INVITED)
            .build();
        eventParticipantRepository.save(participant);

        String baseLink = configurationProperties.getUrl() + "/event/" + eventId;
        String acceptLink = baseLink + "/accept";
        String declineLink = baseLink + "/decline";

        mailService.sendMail(targetEmail, "Einladung zum Event " + originalEvent.getName(), MailService.TEMPLATE_INVITATION, InvitationData.builder()
            .name(invitedAccount.getName())
            .organizer(originalEvent.getOrganizer().getName())
            .event(originalEvent.getName())
            .acceptLink(acceptLink)
            .declineLink(declineLink)
            .homepage(configurationProperties.getUrl())
            .build());

        log.info("Accept Link: " + acceptLink);
        log.info("Decline Link: " + declineLink);
    }

    /**
     * Implements F016
     */
    public List<Event> getEvents(String email) {
        return eventRepository.findByOrganizer_Email(email);
    }

    public List<EventParticipant> getParticipants(Long eventId, String email) {
        return precheckExistsAndOwnEvent(eventId, email)
            .getEventParticipants();
    }

}

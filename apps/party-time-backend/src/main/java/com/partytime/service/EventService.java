package com.partytime.service;

import com.partytime.api.dto.event.EventCreateDTO;
import com.partytime.api.dto.event.EventDTO;
import com.partytime.api.error.ApiError;
import com.partytime.configuration.JacksonConfiguration;
import com.partytime.configuration.PartyTimeConfigurationProperties;
import com.partytime.jpa.entity.*;
import com.partytime.jpa.mapper.AddressMapper;
import com.partytime.jpa.repository.EventParticipantRepository;
import com.partytime.jpa.repository.EventRepository;
import com.partytime.mail.MailService;
import com.partytime.mail.model.invite.InvitationData;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
     * Implements F016
     */
    public Event getEvent(String email, Long id) {
        Event event = eventRepository.findById(id)
            .orElseThrow(() -> ApiError.notFound("Ein Event mit der ID " + id + " konnte nicht gefunden werden.")
                .asException());

        if (!email.equals(event.getOrganizer().getEmail())) {
            // Authenticated User is not Event Organizer
            throw ApiError.forbidden().asException();
        }
        // return event where id = id and organizer = email
        return event;
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

        Event event = eventRepository.save(originalEvent);

        for (EventParticipant eventParticipant : event.getEventParticipants()) {
            Account account = eventParticipant.getAccount();
            mailService.sendMail(account.getEmail(), "Änderungen am Event " + event.getName(), MailService.TEMPLATE_CHANGE, InvitationData.builder()
                .name(account.getName())
                .organizer(event.getOrganizer().getName())
                .event(event.getName())
                .location(AddressMapper.prettyPrint(event.getAddress()))
                .datetime(JacksonConfiguration.dateTimeFormatter.format(event.getDateTime()))
                .homepage(configurationProperties.getUrl())
                .build(), event);
        }

        return event;
    }

    /**
     * Implements F003
     */
    @Transactional
    public void deleteEventById(Long eventId, String email) {
        Event event = precheckExistsAndOwnEvent(eventId, email);

        List<EventParticipant> eventParticipants = new ArrayList<>(event.getEventParticipants());

        eventRepository.delete(event);

        for (EventParticipant eventParticipant : eventParticipants) {
            Account account = eventParticipant.getAccount();
            mailService.sendMail(account.getEmail(), "Absage des Events " + event.getName(), MailService.TEMPLATE_DELETE, InvitationData.builder()
                .name(account.getName())
                .organizer(event.getOrganizer().getName())
                .event(event.getName())
                .location(AddressMapper.prettyPrint(event.getAddress()))
                .datetime(JacksonConfiguration.dateTimeFormatter.format(event.getDateTime()))
                .homepage(configurationProperties.getUrl())
                .build());
        }
    }

    /**
     * Implements F003
     */
    @Transactional
    public void deleteMultipleEvents(List<Event> events) {
        eventRepository.deleteAll(events);
    }

    private Event precheckExistsAndOwnEvent(Long eventId, String email) {
        Event originalEvent = eventRepository.findById(eventId)
            .orElseThrow(() -> ApiError
                .notFound("Ein Event mit der ID " + eventId + " konnte nicht gefunden werden.").asException());

        if (!email.equals(originalEvent.getOrganizer().getEmail())) {
            // Authenticated User is not Event Organizer
            throw ApiError.forbidden().asException();
        }
        return originalEvent;
    }

    /**
     * Implements F005
     */
    @Transactional
    public void uninviteParticipant(Long eventId, String targetEmail, String authenticatedUser) {
        Event originalEvent = precheckExistsAndOwnEvent(eventId, authenticatedUser);

        Account invitedAccount = accountService.getAccount(targetEmail);

        EventParticipant eventParticipant = eventParticipantRepository
            .findByEvent_IdAndAccount_Id(eventId, invitedAccount.getId())
            .orElseThrow(() -> ApiError
                .badRequest("Der Account mit der Email " + targetEmail + " wurde nicht eingeladen")
                .asException());

        eventParticipantRepository.delete(eventParticipant);

        mailService.sendMail(targetEmail, "Du wurdest beim Event " + originalEvent.getName() + " ausgeladen.",
            MailService.TEMPLATE_UNINVITE, InvitationData.builder()
                .name(invitedAccount.getName())
                .organizer(originalEvent.getOrganizer().getName())
                .event(originalEvent.getName())
                .homepage(configurationProperties.getUrl())
                .build());
    }

    /**
     * Implements F004
     * Implements F007
     */
    @Transactional
    public void inviteParticipant(Long eventId, String targetEmail, String authenticatedUser) {
        Event originalEvent = precheckExistsAndOwnEvent(eventId, authenticatedUser);
        Account invitedAccount = accountService.getAccount(targetEmail);

        if (eventParticipantRepository.existsByEvent_IdAndAccount_Id(eventId, invitedAccount.getId())) {
            throw ApiError.badRequest("Der Account mit der Email " + targetEmail + " wurde bereits eingeladen")
                .asException();
        }

        EventParticipant participant = EventParticipant.builder()
            .account(invitedAccount)
            .event(originalEvent)
            .status(Status.INVITED)
            .build();
        eventParticipantRepository.save(participant);

        String baseLink = configurationProperties.getUrl() + eventId + "/invitation/";
        String acceptLink = baseLink + "/accept";
        String declineLink = baseLink + "/decline";

        mailService.sendMail(targetEmail, "Einladung zum Event " + originalEvent.getName(),
            MailService.TEMPLATE_INVITATION, InvitationData.builder()
                .name(invitedAccount.getName())
                .organizer(originalEvent.getOrganizer().getName())
                .event(originalEvent.getName())
                .location(AddressMapper.prettyPrint(originalEvent.getAddress()))
                .datetime(JacksonConfiguration.dateTimeFormatter.format(originalEvent.getDateTime()))
                .acceptLink(acceptLink)
                .declineLink(declineLink)
                .homepage(configurationProperties.getUrl())
                .build(), originalEvent);

        log.info("Accept Link: " + acceptLink);
        log.info("Decline Link: " + declineLink);
    }

    /**
     * Implements F016
     */
    public List<Event> getEvents(String email) {
        return eventRepository.findByOrganizer_Email(email);
    }

    /**
     * Implements F007
     */
    @Transactional(readOnly = true)
    public List<EventParticipant> getParticipatingEvents(String email) {
        return eventParticipantRepository.findAllByAccount_Email(email);
    }

    /**
     * Implements F007
     */
    public EventParticipant getParticipatingEvent(Long event, String email) {
        return Optional.of(getEventParticipant(event, email))
            .orElseThrow(() -> ApiError.notFound("Das Event konnte nicht gefunden werden").asException());
    }

    private EventParticipant getEventParticipant(Long event, String email) {
        return eventParticipantRepository.findByEvent_IdAndAccount_Email(event, email)
            .orElseThrow(() -> ApiError.notFound("Das Event konnte nicht gefunden werden").asException());
    }

    /**
     * Implements F006
     */
    public List<EventParticipant> getParticipants(Long eventId, String email) {
        return precheckExistsAndOwnEvent(eventId, email)
            .getEventParticipants();
    }

    /**
     * Implements F008
     */
    public void acceptInvitation(Long eventId, String currentUserMail) {
        EventParticipant eventParticipant = getEventParticipant(eventId, currentUserMail);
        eventParticipant.setStatus(Status.PARTICIPATING);
        eventParticipantRepository.save(eventParticipant);
    }

    /**
     * Implements F009
     */
    public void declineInvitation(Long eventId, String currentUserMail) {
        EventParticipant eventParticipant = getEventParticipant(eventId, currentUserMail);
        eventParticipant.setStatus(Status.REJECTED);
        eventParticipantRepository.save(eventParticipant);
    }

}

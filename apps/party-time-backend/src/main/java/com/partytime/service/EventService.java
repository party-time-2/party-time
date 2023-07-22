package com.partytime.service;

import com.partytime.api.dto.event.EventCreateDTO;
import com.partytime.api.dto.event.EventDTO;
import com.partytime.api.dto.event.ParticipantDTO;
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

    private EventParticipant eventExistsAndGetParticipant(Long eventId, String email) {
        Event originalEvent = eventRepository.findById(eventId)
                .orElseThrow(() -> ApiError
                        .notFound("Ein Event mit der ID " + eventId + " konnte nicht gefunden werden.").asException());

        EventParticipant eventParticipant = originalEvent.getEventParticipants().stream()
                .filter(e -> e.getAccount().getEmail().equals(email)).findFirst().get();
        if (eventParticipant == null) {
            // Authenticated User is not invited to this event
            throw ApiError.forbidden().asException();
        }

        return eventParticipant;
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

        String baseLink = configurationProperties.getUrl() + "/invitation/" + eventId;
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

    /**
     * Implements F007
     */
    @Transactional(readOnly = true)
    public List<Event> getParticipatingEvents(String email) {
        return eventParticipantRepository.streamAllByAccount_Email(email)
            .map(EventParticipant::getEvent)
            .toList();
    }

    /**
     * Implements F007
     */
    public Event getParticipatingEvent(Long event, String email) {
        return eventParticipantRepository.findByEvent_IdAndAccount_Email(event, email)
            .orElseThrow(() -> ApiError.notFound("Das Event konnte nicht gefunden werden").asException())
            .getEvent();
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
    public void acceptInvitation(Long eventId,
            String currentUserMail) {
        EventParticipant eventParticipant = eventExistsAndGetParticipant(eventId, currentUserMail);
        eventParticipant.setStatus(Status.PARTICIPATING);
        eventParticipantRepository.save(eventParticipant);
        // TODO Lucas
    }

    /**
     * Implements F009
     */
    public void declineInvitation(Long eventId,
                                  String currentUserMail) {
        EventParticipant eventParticipant = eventExistsAndGetParticipant(eventId, currentUserMail);
        eventParticipant.setStatus(Status.REJECTED);
        eventParticipantRepository.save(eventParticipant);
        // TODO Lucas
    }
}

package com.partytime.jpa.entity;

import com.partytime.jpa.DatabaseConstants;
import com.partytime.jpa.factory.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = DatabaseConstants.Event.TABLE_NAME)
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Event extends BaseEntity<Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = DatabaseConstants.Event.COLUMN_ORGANIZER_ID)
    private Account organizer;

    @NotNull
    @NotEmpty
    @Column(name = DatabaseConstants.Event.COLUMN_NAME)
    private String name;

    @NotNull
    @FutureOrPresent
    @Column(name = DatabaseConstants.Event.COLUMN_DATE_TIME)
    private LocalDateTime dateTime;

    @NotNull
    @ManyToOne
    @JoinColumn(name = DatabaseConstants.Event.COLUMN_ADDRESS)
    private Address address;

    @OneToMany(mappedBy = "event")
    @ToString.Exclude
    private List<EventParticipant> eventParticipants = new ArrayList<>();

}

package com.partytime.jpa.entity;

import com.partytime.jpa.DatabaseConstants;
import com.partytime.jpa.factory.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = DatabaseConstants.EventParticipant.TABLE_NAME)
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EventParticipant extends BaseEntity<Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = DatabaseConstants.EventParticipant.COLUMN_ACCOUNT_ID)
    private Account account;

    @NotNull
    @ManyToOne
    @JoinColumn(name = DatabaseConstants.EventParticipant.COLUMN_EVENT_ID)
    private Event event;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = DatabaseConstants.EventParticipant.COLUMN_STATUS)
    private Status status;

}

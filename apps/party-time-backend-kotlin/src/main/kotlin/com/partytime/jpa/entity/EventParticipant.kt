package com.partytime.jpa.entity

import com.partytime.jpa.DatabaseConstants
import com.partytime.jpa.factory.EntityWithLongId
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import jakarta.persistence.Table

@Entity
@Table(name = DatabaseConstants.EventParticipant.TABLE_NAME)
class EventParticipant(
    @ManyToOne
    @JoinColumn(name = DatabaseConstants.EventParticipant.COLUMN_ACCOUNT_ID)
    var account: Account,
    @ManyToOne
    @JoinColumn(name = DatabaseConstants.EventParticipant.COLUMN_EVENT_ID)
    var event: Event,
    @Enumerated(EnumType.STRING)
    @Column(name = DatabaseConstants.EventParticipant.COLUMN_STATUS)
    var status: Status
): EntityWithLongId()

package com.partytime.jpa.entity

import com.partytime.jpa.DatabaseConstants
import com.partytime.jpa.factory.EntityWithLongId
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import jakarta.persistence.OneToMany
import jakarta.persistence.Table
import jakarta.validation.constraints.FutureOrPresent
import jakarta.validation.constraints.NotEmpty
import jakarta.validation.constraints.Size
import java.time.LocalDateTime

@Entity
@Table(name = DatabaseConstants.Event.TABLE_NAME)
class Event(
    @ManyToOne
    @JoinColumn(name = DatabaseConstants.Event.COLUMN_ORGANIZER_ID)
    var organizer: Account,
    @field:NotEmpty
    @field:Size(min = 5, max = 20)
    @Column(name = DatabaseConstants.Event.COLUMN_NAME)
    var name: String,
    @field:FutureOrPresent
    @Column(name = DatabaseConstants.Event.COLUMN_DATE_TIME)
    var dateTime: LocalDateTime,
    @ManyToOne
    @JoinColumn(name = DatabaseConstants.Event.COLUMN_ADDRESS)
    var address: Address,
    @OneToMany(mappedBy = "event")
    var eventParticipants: MutableSet<EventParticipant> = HashSet()
): EntityWithLongId()

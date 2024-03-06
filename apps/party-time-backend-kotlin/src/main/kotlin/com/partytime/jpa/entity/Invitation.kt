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
@Table(name = DatabaseConstants.Invitation.TABLE_NAME)
class Invitation(
    @ManyToOne
    @JoinColumn(name = DatabaseConstants.Invitation.COLUMN_ACCOUNT_ID)
    var account: Account,
    @ManyToOne
    @JoinColumn(name = DatabaseConstants.Invitation.COLUMN_EVENT_ID)
    var event: Event,
    @Enumerated(EnumType.STRING)
    @Column(name = DatabaseConstants.Invitation.COLUMN_STATUS)
    var status: Status
): EntityWithLongId()

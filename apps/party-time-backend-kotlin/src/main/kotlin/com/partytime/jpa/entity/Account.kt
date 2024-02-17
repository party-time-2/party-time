package com.partytime.jpa.entity

import com.partytime.jpa.DatabaseConstants
import com.partytime.jpa.factory.EntityWithLongId
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Table
import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotEmpty

@Entity
@Table(name = DatabaseConstants.Account.TABLE_NAME)
class Account(
    @field:Email
    @field:NotEmpty
    @Column(name = DatabaseConstants.Account.COLUMN_EMAIL)
    var email: String,
    @Column(name = DatabaseConstants.Account.COLUMN_EMAIL_VERIFIED)
    var emailVerified: Boolean,
    @field:NotEmpty
    @Column(name = DatabaseConstants.Account.COLUMN_NAME)
    var name: String,
    @field:NotEmpty
    @Column(name = DatabaseConstants.Account.COLUMN_PW_HASH)
    var pwHash: String,
    @field:Column(name = DatabaseConstants.Account.COLUMN_EMAIL_VERIFICATION_CODE)
    var emailVerificationCode: String? = null,
    @Column(name = DatabaseConstants.Account.COLUMN_PASSWORD_VERIFICATION_CODE)
    var passwordVerificationCode: String? = null
): EntityWithLongId()

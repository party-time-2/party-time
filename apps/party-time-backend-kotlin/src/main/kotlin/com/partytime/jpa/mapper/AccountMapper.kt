package com.partytime.jpa.mapper

import com.partytime.api.dto.account.AccountDTO
import com.partytime.jpa.entity.Account

fun Account.map(): AccountDTO = AccountDTO(id!!, name, email, emailVerified)

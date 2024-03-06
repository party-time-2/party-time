package com.partytime.jpa.mapper

import com.partytime.api.dto.account.AccountDTO
import com.partytime.jpa.entity.Account

/**
 * Transforms an [Account] entity into a (serializable) [AccountDTO]
 * All outbound account information has been saved to database and therefore has a not-null id.
 *
 * @receiver transformation subject
 * @return transformation result, ready for serialization and transmission to the client
 */
fun Account.toAccountDTO(): AccountDTO = AccountDTO(id!!, name, email)

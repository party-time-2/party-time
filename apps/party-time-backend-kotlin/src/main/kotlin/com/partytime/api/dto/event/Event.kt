package com.partytime.api.dto.event

import com.partytime.api.dto.account.AccountDTO
import com.partytime.api.dto.address.AddressDTO
import com.partytime.jpa.entity.Status
import jakarta.validation.Valid
import jakarta.validation.constraints.FutureOrPresent
import jakarta.validation.constraints.NotEmpty
import jakarta.validation.constraints.Size
import java.time.LocalDateTime

//FIXME Maybe rework EventDTO <-> ParticipatingEventDTO relationship

data class EventCreateDTO(
    @field:NotEmpty
    @field:Size(min = 5, max = 20)
    val name: String,
    @field:FutureOrPresent
    val dateTime: LocalDateTime,
    @field:Valid
    val address: AddressDTO
)

sealed interface IEventDTO {
    val id: Long
    val name: String
    val organizer: AccountDTO
    val dateTime: LocalDateTime
    val address: AddressDTO
    val participants: List<ParticipantDTO>
}

interface IParticipatingEventDTO: IEventDTO {
    val status: Status
}


data class EventDTO(
    override val id: Long,
    @field:NotEmpty
    @field:Size(min = 5, max=20)
    override val name: String,
    @field:Valid
    override val organizer: AccountDTO,
    @field:FutureOrPresent
    override val dateTime: LocalDateTime,
    @Valid
    override val address: AddressDTO,
    override val participants: List<ParticipantDTO>
): IEventDTO

data class ParticipatingEventDTO (
    override val id: Long,
    @field:NotEmpty
    @field:Size(min = 5, max=20)
    override val name: String,
    @field:Valid
    override val organizer: AccountDTO,
    @field:FutureOrPresent
    override val dateTime: LocalDateTime,
    @Valid
    override val address: AddressDTO,
    override val participants: List<ParticipantDTO>,
    override val status: Status
): IParticipatingEventDTO, IEventDTO

data class ParticipantDTO(
    val account: AccountDTO,
    val status: Status
)

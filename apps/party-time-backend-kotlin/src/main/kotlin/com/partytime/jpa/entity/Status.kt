package com.partytime.jpa.entity

import io.swagger.v3.oas.annotations.media.Schema

@Schema(enumAsRef = true)
enum class Status {
    INVITED,
    PARTICIPATING,
    DECLINED
}

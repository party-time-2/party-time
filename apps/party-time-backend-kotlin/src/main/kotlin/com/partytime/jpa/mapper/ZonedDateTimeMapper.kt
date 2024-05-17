package com.partytime.jpa.mapper

import java.time.ZonedDateTime
import java.time.format.DateTimeFormatter
import java.time.format.FormatStyle

/**
 * Converts a [ZonedDateTime] into a human-readable string that can be inserted into an Email
 *
 * @receiver The [ZonedDateTime] that should be formatted
 * @return Human-readable formatted date and time
 */
fun ZonedDateTime.toEmailFormat(): String =
    DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM).format(this)

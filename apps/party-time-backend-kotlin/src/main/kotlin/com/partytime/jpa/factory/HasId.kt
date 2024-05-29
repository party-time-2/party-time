package com.partytime.jpa.factory

import java.io.Serializable

interface HasId<T>: Serializable {
    val id: Long?
}

package com.partytime.jpa.factory

import jakarta.persistence.MappedSuperclass
import org.hibernate.Hibernate
import java.io.Serializable
import java.util.Objects

@MappedSuperclass
abstract class BaseEntity<T: Serializable>: HasId<T> {

    override fun equals(other: Any?): Boolean =
        when {
            this === other -> true
            other == null || Hibernate.getClass(this) != Hibernate.getClass(other) -> false
            else -> (other as? BaseEntity<*>)?.let {
                Objects.equals(it.id, other.id)
            } ?: false
    }

    override fun hashCode(): Int = id?.toInt() ?: 0
}

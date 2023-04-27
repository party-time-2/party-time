package com.partytime.jpa.factory;

import jakarta.persistence.MappedSuperclass;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;

/**
 * Base Super Class for all Entities
 *
 * @param <T> The Type of the ID
 */
@MappedSuperclass
public abstract class BaseEntity<T extends Serializable> implements HasId<T> {

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        BaseEntity<?> other = (BaseEntity<?>) o;
        return getId() != null && Objects.equals(getId(), other.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}

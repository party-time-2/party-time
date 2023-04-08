package com.partytime.jpa.factory;

import java.io.Serializable;

/**
 * Marker Interface providing generic Access to an ID of an POJO.</br>
 * At least all Entities should implement this
 *
 * @param <T> The Type of the ID
 */
public interface HasId<T> extends Serializable {

    /**
     * Get the ID
     *
     * @return typed id of POJO
     */
    T getId();

    /**
     * Set the ID
     *
     * @param id typed id of POJO
     */
    void setId(T id);

}

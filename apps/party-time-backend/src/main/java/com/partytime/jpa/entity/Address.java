package com.partytime.jpa.entity;

import com.partytime.jpa.DatabaseConstants;
import com.partytime.jpa.factory.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = DatabaseConstants.Address.TABLE_NAME)
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Address extends BaseEntity<Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @NotEmpty
    @Column(name = DatabaseConstants.Address.COLUMN_STREET_AND_HOUSE_NUMBER)
    private String streetAndHouseNumber;

    @NotNull
    @NotEmpty
    @Column(name = DatabaseConstants.Address.COLUMN_PLZ)
    private String plz;

    @NotNull
    @NotEmpty
    @Column(name = DatabaseConstants.Address.COLUMN_LOCATION)
    private String location;

    @NotNull
    @NotEmpty
    @Column(name = DatabaseConstants.Address.COLUMN_COUNTRY)
    private String country;

}

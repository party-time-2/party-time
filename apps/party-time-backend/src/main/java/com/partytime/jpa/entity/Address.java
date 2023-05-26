package com.partytime.jpa.entity;

import com.partytime.jpa.DatabaseConstants;
import com.partytime.jpa.factory.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

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
    @Column(name = DatabaseConstants.Address.COLUMN_ADDRESS_LINE)
    private String addressLine;

    @NotNull
    @NotEmpty
    @Column(name = DatabaseConstants.Address.COLUMN_ADDRESS_LINE_ADDITION)
    private String addressLineAddition;

    @NotNull
    @NotEmpty
    @Column(name = DatabaseConstants.Address.COLUMN_ZIP)
    private String zip;

    @NotNull
    @NotEmpty
    @Column(name = DatabaseConstants.Address.COLUMN_CITY)
    private String city;

    @NotNull
    @NotEmpty
    @Column(name = DatabaseConstants.Address.COLUMN_COUNTRY)
    private String country;

}

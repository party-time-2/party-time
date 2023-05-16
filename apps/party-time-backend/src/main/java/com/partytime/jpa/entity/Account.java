package com.partytime.jpa.entity;

import com.partytime.jpa.DatabaseConstants;
import com.partytime.jpa.factory.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;

@Entity
@Table(name = DatabaseConstants.Account.TABLE_NAME)
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Account extends BaseEntity<Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Email
    @NotNull
    @NotEmpty
    @Column(name = DatabaseConstants.Account.COLUMN_EMAIL)
    private String email;

    @Column(name = DatabaseConstants.Account.COLUMN_EMAIL_VERIFIED)
    private boolean emailVerified;

    @NotNull
    @NotEmpty
    @Column(name = DatabaseConstants.Account.COLUMN_NAME)
    private String name;

    @NotNull
    @NotEmpty
    @Column(name = DatabaseConstants.Account.COLUMN_PW_HASH)
    private String pwHash;

    @Column(name = DatabaseConstants.Account.COLUMN_EMAIL_VERIFICATION_CODE)
    private String emailVerificationCode;

    @Column(name = DatabaseConstants.Account.COLUMN_PASSWORD_VERIFICATION_CODE)
    private String passwordVerificationCode;

    @OneToMany(mappedBy = "account")
    @ToString.Exclude
    private List<EventParticipant> participatesIn;

}

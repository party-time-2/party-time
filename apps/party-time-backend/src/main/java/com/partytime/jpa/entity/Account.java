package com.partytime.jpa.entity;

import com.partytime.jpa.DatabaseConstants;
import com.partytime.jpa.factory.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = DatabaseConstants.Account.TABLE_NAME)
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Account extends BaseEntity<String> {

    @Id
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

    @Override
    public String getId() {
        return email;
    }

    @Override
    public void setId(String id) {
        this.email = id;
    }

}

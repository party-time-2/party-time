package com.partytime.mail.model.verifyaccount;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class VerifyAccountModel {

    private String homepage;
    private String name;
    private String verificationLink;

}

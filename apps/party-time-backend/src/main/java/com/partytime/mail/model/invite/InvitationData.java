package com.partytime.mail.model.invite;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InvitationData {

    private String name;
    private String organizer;
    private String event;
    private String acceptLink;
    private String declineLink;
    private String homepage;

}

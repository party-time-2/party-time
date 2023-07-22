package com.partytime.mail.model.univite.invite;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UninviteData {

    private String name;
    private String organizer;
    private String event;
    private String homepage;

}

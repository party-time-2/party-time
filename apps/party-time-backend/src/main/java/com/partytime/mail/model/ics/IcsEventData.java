package com.partytime.mail.model.ics;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class IcsEventData {

    private String website;
    private String generatedTimestamp;
    private String organizerName;
    private String organizerEmail;
    private String uid;
    private String start;
    private String event;
    private String address;

}

package com.partytime.api.dto;

import com.partytime.api.ApiConstants;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AccountRegisterDTO {

    @NotNull
    @NotEmpty
    @Size(min = 5, max = 20)
    private String name;

    @NotNull
    @NotEmpty
    @Email
    private String email;

    @NotNull
    @NotEmpty
    @Size(min = 8, max = 30)
    @Pattern(regexp = ApiConstants.REGEX_PASSWORD)
    private String password;

}

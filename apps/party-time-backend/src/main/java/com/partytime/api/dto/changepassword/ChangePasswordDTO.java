package com.partytime.api.dto.changepassword;

import com.partytime.api.ApiConstants;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChangePasswordDTO {

    @NotNull
    @NotEmpty
    @Size(min = 8, max = 30)
    @Pattern(regexp = ApiConstants.REGEX_PASSWORD)
    private String oldPassword;

    @NotNull
    @NotEmpty
    @Size(min = 8, max = 30)
    @Pattern(regexp = ApiConstants.REGEX_PASSWORD)
    private String newPassword;

}

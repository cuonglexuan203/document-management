package vn.edu.hcmute.documentmanagement.dto;

import jakarta.validation.constraints.*;
import lombok.*;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PRIVATE, force = true)
public class UserDto {

    @NotBlank(message = "full name is required")
    private String fullName;

    @Past
    private Date birthday;

    @Email
    private String email;

    @Min(value = 1)
    private String[] role;
}

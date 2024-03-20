package vn.edu.hcmute.documentmanagement.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import vn.edu.hcmute.documentmanagement.model.Role;
import vn.edu.hcmute.documentmanagement.model.User;

import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PRIVATE, force = true)
public class UserDto {

    @Min(value=0)
    private long id;

    @NotBlank(message = "full name is required")
    private String fullName;

    @Past(message = "birthday must be less than or equal to the current datetime")
    @NotNull
    private Date birthday;

    @Email(message = "email must follow the standard conventions")
    private String email;

    @NotNull(message = "user must belongs to a ministry")
    private String ministry;

    @Min(value = 1, message = "user must have at least one role")
    private List<String> role;

    public static UserDto of(@NotNull User user) {
        UserDto userDto = UserDto.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .birthday(user.getBirthday())
                .email(user.getEmail())
                .ministry(user.getMinistry().getName())
                .role(user.getRoles().stream().map(ele -> ele.getRole().name()).toList()).build();
        return userDto;
    }
}

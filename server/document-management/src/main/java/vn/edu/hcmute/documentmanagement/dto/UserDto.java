package vn.edu.hcmute.documentmanagement.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.*;
import lombok.*;
import vn.edu.hcmute.documentmanagement.model.Ministry;
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

    @NotBlank(message = "Username is mandatory")
    private String username;

    @NotBlank(message = "Password is mandatory")
    private String password;

    @NotNull(message = "user must belongs to a ministry")
    private String ministry;

    @Min(value = 1, message = "user must have at least one role")
    private List<String> roles;

    public static UserDto of(@NotNull User user) {
        UserDto userDto = UserDto.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .birthday(user.getBirthday())
                .email(user.getEmail())
                .username(user.getUsername())
                .password(user.getPassword())
                .ministry(user.getMinistry().getName())
                .roles(user.getRoles().stream().map(ele -> ele.getRole().name()).toList()).build();
        return userDto;
    }

    public static List<UserDto> of(List<User> users){
        List<UserDto> userDtos = users.stream().map(UserDto::of).toList();
        return userDtos;
    }
    public static User toUser(UserDto userDto, Role role, Ministry ministry) {
        User doc = User.builder()
                .id(userDto.getId())
                .fullName(userDto.getFullName())
                .birthday(userDto.getBirthday())
                .email(userDto.getEmail())
                .username(userDto.getUsername())
                .password(userDto.getPassword())
                .build();
        doc.addMinistry(ministry);
        doc.addRole(role);
        return doc;
    }
}

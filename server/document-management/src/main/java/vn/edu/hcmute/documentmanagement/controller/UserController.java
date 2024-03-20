package vn.edu.hcmute.documentmanagement.controller;

import jakarta.validation.constraints.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmute.documentmanagement.dto.UserDto;
import vn.edu.hcmute.documentmanagement.model.Ministry;
import vn.edu.hcmute.documentmanagement.model.Role;
import vn.edu.hcmute.documentmanagement.model.User;
import vn.edu.hcmute.documentmanagement.service.MinistryService;
import vn.edu.hcmute.documentmanagement.service.RoleService;
import vn.edu.hcmute.documentmanagement.service.UserService;
import vn.edu.hcmute.documentmanagement.util.CustomResponse;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(value = "*")
public class UserController {

    private final UserService userService;
    private final MinistryService ministryService;
    private final RoleService roleService;

    public UserController(UserService userService, MinistryService ministryService, RoleService roleService) {
        this.userService = userService;
        this.ministryService = ministryService;
        this.roleService = roleService;
    }

    @GetMapping()
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return ResponseEntity.ok(UserDto.of(userService.getAllUsers()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable long id) {
        String message = "User not found with id: " + id;
        return ResponseEntity.ok(UserDto.of(userService.getUserByIdOrElseThrow(id, message)));
    }

    private CustomResponse validateMutationUser(@NotNull UserDto userDto) {
        long roleId = userDto.getRoleId();
        String ministryName = userDto.getMinistry();

        if (roleId <= 0 || ministryName.isBlank()) {
            return CustomResponse.badRequest("The user role must not be empty and ministry must be valid");
        }
        String messageError = "Role id not found";
        Role role = roleService.getRoleByIdOrElseThrow(roleId, messageError);
        Ministry ministry = ministryService.getMinistryByName(ministryName).getFirst();
        if (role == null || ministry == null) {
            return CustomResponse.notFound("Could not find the role or ministry of provided document");
        }
        return CustomResponse.ok("validated document");
    }

    @PostMapping
    public ResponseEntity<CustomResponse> addDocument(@RequestBody UserDto userDto) {
        CustomResponse response = validateMutationUser(userDto);
        int statusCode = response.getStatus();
        switch (statusCode) {
            case 200: {
                break;
            }
            case 400: {
                return ResponseEntity.badRequest().body(response);
            }
            case 404: {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            case 500: {
                break;
            }
        }
        String messageError = "Role id not found";
        Role role = roleService.getRoleByIdOrElseThrow(userDto.getRoleId(), messageError);
        Ministry ministry = ministryService.getMinistryByName(userDto.getMinistry()).getFirst();
        User user = UserDto.toUser(userDto, role, ministry);
        userService.addUser(user);
        return ResponseEntity.ok(CustomResponse.ok("Successfully added"));
    }

    @PutMapping
    public ResponseEntity<CustomResponse> updateUser(@RequestBody UserDto userDto) {
        CustomResponse response = validateMutationUser(userDto);
        int statusCode = response.getStatus();
        switch (statusCode) {
            case 200: {
                break;
            }
            case 400: {
                return ResponseEntity.badRequest().body(response);
            }
            case 404: {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            case 500: {
                break;
            }
        }
        String messageError = "Role id not found";
        Role role = roleService.getRoleByIdOrElseThrow(userDto.getRoleId(), messageError);
        Ministry ministry = ministryService.getMinistryByName(userDto.getMinistry()).getFirst();
        User user = UserDto.toUser(userDto, role, ministry);
        userService.updateUser(user);
        return ResponseEntity.ok(CustomResponse.ok("Successfully updated"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<CustomResponse> deleteDocument(@PathVariable long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(CustomResponse.ok("Successfully deleted"));
    }
}

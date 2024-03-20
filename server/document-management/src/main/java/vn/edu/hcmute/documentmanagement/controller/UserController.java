package vn.edu.hcmute.documentmanagement.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmute.documentmanagement.dto.UserDto;
import vn.edu.hcmute.documentmanagement.model.User;
import vn.edu.hcmute.documentmanagement.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(value = "*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable long id) {
        String message = "User not found with id: " + id;
        return ResponseEntity.ok(UserDto.of(userService.getUserByIdOrElseThrow(id, message)));
    }
}

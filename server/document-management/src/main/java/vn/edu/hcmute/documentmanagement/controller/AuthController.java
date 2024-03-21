package vn.edu.hcmute.documentmanagement.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmute.documentmanagement.dto.LoginRequestDto;
import vn.edu.hcmute.documentmanagement.model.User;
import vn.edu.hcmute.documentmanagement.service.UserService;

import java.util.Base64;

@Slf4j
@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private UserService userService;
    private PasswordEncoder passwordEncoder;
    public AuthController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDto body){
        String username = body.getUsername();
        String password = body.getPassword();
        //
        User user = userService.getUserByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Username not found"));
        if(!passwordEncoder.matches(password, user.getPassword())){
            throw new RuntimeException("Invalid password");
        }
        //
        String basicAuth = username + ":" + password;
        String basicAuthEncoded = Base64.getEncoder().encodeToString(basicAuth.getBytes());
        return ResponseEntity.ok().header("Authorization", basicAuthEncoded).build();
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(){
        return ResponseEntity.ok().header("Authorization",null).build();
    }
}

package vn.edu.hcmute.documentmanagement.service;

import org.springframework.stereotype.Service;
import vn.edu.hcmute.documentmanagement.model.Ministry;
import vn.edu.hcmute.documentmanagement.model.Role;
import vn.edu.hcmute.documentmanagement.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getAllUsers();
    Optional<User> getUserById(long id);
    User getUserByIdOrElseThrow(long id, String message);
    Optional<User> getUserByUsername(String username);
    List<User> getUserByFullName(String fullName);
    Optional<User> getUserByEmail(String email);
    void associate(User user, Role role, Ministry ministry);
    User addUser(User user);
    User addUser(User user, Role role, Ministry ministry);
    List<User> addAllUsers(User[] users);
    List<User> addAllUsers(List<User> users);
    User updateUser(User user);
    void deleteUser(long id);
    //
    // add roles
}

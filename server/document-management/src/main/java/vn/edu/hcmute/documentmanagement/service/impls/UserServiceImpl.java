package vn.edu.hcmute.documentmanagement.service.impls;

import jakarta.validation.Valid;
import org.springframework.stereotype.Service;
import vn.edu.hcmute.documentmanagement.exception.ResourceNotFoundException;
import vn.edu.hcmute.documentmanagement.model.Document;
import vn.edu.hcmute.documentmanagement.model.Ministry;
import vn.edu.hcmute.documentmanagement.model.Role;
import vn.edu.hcmute.documentmanagement.model.User;
import vn.edu.hcmute.documentmanagement.repository.UserRepository;
import vn.edu.hcmute.documentmanagement.service.UserService;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepo;

    public UserServiceImpl(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public Optional<User> getUserById(long id) {
        return userRepo.findById(id);
    }

    @Override
    public User getUserByIdOrElseThrow(long id, String message) {
        User user = userRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException(message));
        return user;
    }

    @Override
    public Optional<User> getUserByUsername(String username) {
        return userRepo.findByUsername(username);
    }

    @Override
    public List<User> getUserByFullName(String fullName) {
        return userRepo.findByFullNameIgnoreCase(fullName);
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    @Override
    public User addUser(@Valid User user) {

        if(user.getId() != 0){
            user.setId(0);
        }
        return userRepo.save(user);
    }

    @Override
    public void associate(User user,Role role, Ministry ministry){
        user.getRoles().add(role);
        role.setUser(user);
        //
        user.setMinistry(ministry);
        ministry.getUsers().add(user);
    }
    @Override
    public User addUser(User user, Role role, Ministry ministry) {
        if(user.getId() != 0){
            user.setId(0);
        }
        associate(user, role, ministry);
        return userRepo.save(user);
    }

    @Override
    public List<User> addAllUsers(User[] users) {
        List<User> userList = Arrays.asList(users);
        userList.forEach(ele -> {
            if (ele.getId() != 0) {
                ele.setId(0);
            }
        });
        return userRepo.saveAll(userList);
    }

    @Override
    public List<User> addAllUsers(List<User> users) {
        users.forEach(ele -> {
            if (ele.getId() != 0) {
                ele.setId(0);
            }
        });
        return userRepo.saveAll(users);
    }

    @Override
    public User updateUser(@Valid User user) {
        long id = user.getId();
        String message = "User not found with id: " + id;
        getUserByIdOrElseThrow(id, message);
        return userRepo.save(user);
    }

    @Override
    public void deleteUser(long id) {
        String message = "User not found with id: " + id;
        getUserByIdOrElseThrow(id, message);
        userRepo.deleteById(id);
    }
}

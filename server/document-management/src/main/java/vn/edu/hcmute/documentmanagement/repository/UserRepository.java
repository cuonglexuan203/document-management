package vn.edu.hcmute.documentmanagement.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.hcmute.documentmanagement.model.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    List<User> findByFullNameIgnoreCase(String fullName);
    Optional<User> findByEmail(String email);
}

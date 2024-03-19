package vn.edu.hcmute.documentmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.hcmute.documentmanagement.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
}

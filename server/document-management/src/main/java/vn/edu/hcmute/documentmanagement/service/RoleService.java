package vn.edu.hcmute.documentmanagement.service;

import vn.edu.hcmute.documentmanagement.model.Role;

import java.util.List;
import java.util.Optional;

public interface RoleService {

    Role addRole(Role role);
    List<Role> addAllRoles(Role[] roles);
    List<Role> addAllRoles(List<Role> roles);
    Role getRoleByIdOrElseThrow(long id, String messageError);

}

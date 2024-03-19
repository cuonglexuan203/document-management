package vn.edu.hcmute.documentmanagement.service;

import vn.edu.hcmute.documentmanagement.model.Role;

import java.util.List;

public interface RoleService {
    Role addRole(Role role);
    List<Role> addAllRoles(Role[] roles);
    List<Role> addAllRoles(List<Role> roles);

}

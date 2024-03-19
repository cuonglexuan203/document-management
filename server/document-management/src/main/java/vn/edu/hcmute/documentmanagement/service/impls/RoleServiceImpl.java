package vn.edu.hcmute.documentmanagement.service.impls;

import org.springframework.stereotype.Service;
import vn.edu.hcmute.documentmanagement.model.Ministry;
import vn.edu.hcmute.documentmanagement.model.Role;
import vn.edu.hcmute.documentmanagement.repository.RoleRepository;
import vn.edu.hcmute.documentmanagement.service.RoleService;

import java.util.Arrays;
import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepo;

    public RoleServiceImpl(RoleRepository roleRepo) {
        this.roleRepo = roleRepo;
    }

    @Override
    public Role addRole(Role role) {
        if(role.getId() != 0){
            role.setId(0);
        }
        return roleRepo.save(role);
    }

    @Override
    public List<Role> addAllRoles(Role[] roles) {
        List<Role> roleList = Arrays.asList(roles);
        roleList.forEach(ele -> {
            if(ele.getId() != 0){
                ele.setId(0);
            }
        });
        return roleRepo.saveAll(roleList);
    }

    @Override
    public List<Role> addAllRoles(List<Role> roles) {
        roles.forEach(ele -> {
            if(ele.getId() != 0){
                ele.setId(0);
            }
        });
        return roleRepo.saveAll(roles);
    }
}

package vn.edu.hcmute.documentmanagement;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import vn.edu.hcmute.documentmanagement.model.Document;
import vn.edu.hcmute.documentmanagement.model.Ministry;
import vn.edu.hcmute.documentmanagement.model.Role;
import vn.edu.hcmute.documentmanagement.model.User;
import vn.edu.hcmute.documentmanagement.service.DocumentService;
import vn.edu.hcmute.documentmanagement.service.MinistryService;
import vn.edu.hcmute.documentmanagement.service.RoleService;
import vn.edu.hcmute.documentmanagement.service.UserService;
import vn.edu.hcmute.documentmanagement.util.FileUtil;

import java.util.List;

@Slf4j
@SpringBootApplication
public class DocumentManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(DocumentManagementApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(DocumentService documentService, MinistryService ministryService,
                                               UserService userService, RoleService roleService, PasswordEncoder encoder, @Value("${server.port}") int port) {
        return args -> {
            log.info("Server is running on port: {}", port);
//            preloadData(documentService, ministryService, userService, roleService, encoder);
        };
    }

    private void preloadData(DocumentService documentService, MinistryService ministryService,
                             UserService userService, RoleService roleService, PasswordEncoder encoder) {
        List<Document> documents = FileUtil.getObjectsFromFile("preloadData/document.json", Document[].class);
        List<Ministry> ministries = FileUtil.getObjectsFromFile("preloadData/ministry.json", Ministry[].class);
        List<User> users = FileUtil.getObjectsFromFile("preloadData/user.json", User[].class);
        List<Role> roles = FileUtil.getObjectsFromFile("preloadData/role.json", Role[].class);
        //
        if(users != null){
            users = users.stream().peek(user -> user.setPassword(encoder.encode(user.getPassword()))).toList();
        }

        //
        for (int i = 0; i < documents.size(); i++) {
            ministries.get(i % ministries.size()).addDocument(documents.get(i));
            if(i != 0){
//                users.get(i % users.size()).addDocument(documents.get(i));
                users.get(0).addDocument(documents.get(i));
            }else {
                users.get(1).addDocument(documents.get(i));

            }
        }
        for (int i = 0; i < users.size(); i++) {
            ministries.get(i % ministries.size()).addUser(users.get(i));
            users.get(i).addRole(roles.get(i));

        }
        List<Ministry> persistedMinistries = ministryService.addAllMinistries(ministries);
        List<User> persistedUsers = userService.addAllUsers(users);
        List<Role> persistedRoles = roleService.addAllRoles(roles);
        List<Document> persistedDocuments = documentService.addAllDocuments(documents);
        //


    }
}

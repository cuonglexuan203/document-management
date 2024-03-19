package vn.edu.hcmute.documentmanagement.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.validator.constraints.UniqueElements;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE, force = true)
@AllArgsConstructor
@Entity(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Size(min = 5, max = 20, message = "Username should be 6-20 characters long")
    @Column(name = "username", unique = true)
    private String username;


    @NotBlank(message = "Password is mandatory")
    @Min(value = 8, message = "Password should be at least 8 characters long")
    @Column(name = "pw")
    private String password;

    @NotBlank(message = "Full name is mandatory")
    @Column(name = "full_name")
    private String fullName;

    @Email
    @Column(name = "email", unique = true)
    private String email;

    @NotNull
    @Past
    @Column(name = "birthday")
    private Date birthday;

    //
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @Builder.Default
    @OneToMany(mappedBy = "user")
    private List<Role> roles = new ArrayList<>();

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @Builder.Default
    @OneToMany(mappedBy = "user")
    private List<Document> documents = new ArrayList<>();

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @NotNull(message = "User must belongs to a ministry")
    @ManyToOne
    private Ministry ministry;

    //
    public void addMinistry(Ministry ministry) {
        if (!ministry.getUsers().contains(this)) {
            ministry.getUsers().add(this);
            this.setMinistry(ministry);
        }
    }

    public void addDocument(Document document){
        if(!this.documents.contains(document)){
            document.setUser(this);
            this.getDocuments().add(document);
        }
    }
    public void removeDocument(Document document){
        if(this.getDocuments().contains(document)){
            document.setUser(null);
            this.getDocuments().remove(document);
        }
    }

    public void addRole(Role role) {
        if (!this.getRoles().contains(role)) {
            this.getRoles().add(role);
            role.setUser(this);
        }
    }
}

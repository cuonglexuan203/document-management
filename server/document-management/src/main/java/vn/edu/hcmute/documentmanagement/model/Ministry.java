package vn.edu.hcmute.documentmanagement.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.hibernate.validator.constraints.UniqueElements;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE, force = true)
@AllArgsConstructor
@Entity(name = "ministry")
public class Ministry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @NotBlank(message = "Name is required and can not be blank")
    @Column(name = "name",unique = true)
    private String name;

    //
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @Builder.Default
    @OneToMany(mappedBy = "ministry", cascade = {CascadeType.MERGE, CascadeType.REMOVE, CascadeType.REFRESH}, orphanRemoval = true)
    private List<Document> documents = new ArrayList<>();

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @Builder.Default
    @OneToMany(mappedBy = "ministry", cascade = {CascadeType.MERGE, CascadeType.REMOVE, CascadeType.REFRESH}, orphanRemoval = true)
    private List<User> users = new ArrayList<>();
    //
    public void addDocument(Document document){
        if(!this.getDocuments().contains(document)){
            this.getDocuments().add(document);
            document.setMinistry(this);
        }
    }
    // not logical
    public void removeDocument(Document document){
        if(this.getDocuments().contains(document)){
            this.getDocuments().remove(document);
            document.setMinistry(null);
        }
    }
    public void addUser(User user){
        if(!this.getUsers().contains(user)){
            this.getUsers().add(user);
            user.setMinistry(this);
        }
    }
    // not logical
    public void removeUser(User user){
        if(this.getUsers().contains(user)){
            this.getUsers().remove(user);
            user.setMinistry(null);
        }
    }
}

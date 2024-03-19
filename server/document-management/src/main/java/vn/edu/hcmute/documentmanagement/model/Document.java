package vn.edu.hcmute.documentmanagement.model;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.*;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE, force = true)
@AllArgsConstructor
@Entity(name = "document")
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @NotBlank(message = "Title is required")
    @Column(name = "title")
    private String title;

    @Nullable
    @Column(name = "thumbnail")
    private String thumbnail;

    @NotBlank(message = "Version is required")
    @Column(name = "version")
    private String version;

    @NotNull
    @PastOrPresent(message = "The added time must be logical")
    @Column(name = "added_time")
    private Date addedTime;

    @Nullable
    @Column(name = "description")
    private String description;

    @NotNull(message = "Path is required")
    @Column(name = "path")
    private String path;

    //
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @NotNull(message = "user is required")
    @ManyToOne
    private User user;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @NotNull(message = "Ministry is required")
    @ManyToOne
    private Ministry ministry;

    //
    public void addUser(User user){
        if(!user.getDocuments().contains(this)){
            user.getDocuments().add(this);
            this.user = user;
        }
    }
    public void addMinistry(Ministry ministry) {
        if (!ministry.getDocuments().contains(this)) {
            ministry.getDocuments().add(this);
            this.ministry = ministry;
        }
    }
}

package vn.edu.hcmute.documentmanagement.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;


@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE, force = true)
@AllArgsConstructor
@Entity(name = "role")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private RoleLevel role;

    //
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @NotNull
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Getter
    public enum RoleLevel {
        ROLE_ADMIN,
        ROLE_SECRETARY,
        ROLE_USER;

    }
}

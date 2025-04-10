package demo.hotel.modal.entity;

import demo.hotel.modal.constant.StatusAc;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Entity
@Data
@Table()
@EqualsAndHashCode(callSuper=true)
public class Account extends Time{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true)
    private String email;

    @Column
    private String password;

    @Column
    private String fullName;

    @Column
    private String phoneNumber;

    @Column
    private String avatar;

    @Column
    @Enumerated(EnumType.STRING)
    private Position position;

    @Column
    private int amountSpent;

    @Column
    private int points;

    @Column
    @Enumerated(EnumType.STRING)
    private Level level;

    @Column
    @Enumerated(EnumType.STRING)
    private StatusAc status;

    @OneToMany(mappedBy = "account")
    private List<Review> reviews;

    public enum Position {
        ADMIN, USER
    }

    public enum Level {
        NEW_CUSTOMER,
        BRONZE_CUSTOMER,
        SILVER_CUSTOMER,
        GOLD_CUSTOMER,
        LOYAL_CUSTOMER,
        OLD_CUSTOMER,
        ADMIN_CUSTOMER,
    }
}

package demo.hotel.modal.entity;

import demo.hotel.modal.constant.StatusOL;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@Table
@EqualsAndHashCode(callSuper=true)
public class Room extends Time{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String name;

    @Column
    private String image;

    @Column
    private String description;

    @Column
    private int quantity;

    @Column
    private int priceDay;

    @Column
    private int priceNight;

    @Column
    private int priceFirstHour;

    @Column
    private int priceNextHour;

    @Column
    private LocalDate date;

    @Column
    @Enumerated(EnumType.STRING)
    private StatusOL status;

    @OneToMany(mappedBy = "room")
    private List<Review> reviews;
}

package demo.hotel.modal.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

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
}

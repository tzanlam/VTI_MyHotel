package demo.hotel.modal.entity;

import demo.hotel.modal.constant.StatusOL;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

@Entity
@Data
@Table
@EqualsAndHashCode(callSuper=true)
public class Voucher extends Time{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String name;

    @Column
    private String amount;

    @Column
    private int point;

    @Column
    private LocalDateTime expiry;

    @Column
    @Enumerated(EnumType.STRING)
    private StatusOL status;
}

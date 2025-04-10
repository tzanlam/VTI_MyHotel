package demo.hotel.modal.entity;

import demo.hotel.modal.constant.StatusSu;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

@Entity
@Table
@Data
@EqualsAndHashCode(callSuper=true)
public class Booking extends Time{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    @Enumerated(EnumType.STRING)
    private TypeBooking type;

    @ManyToOne
    @JoinColumn
    private Account account;

    @ManyToOne
    @JoinColumn
    private Room room;

    @ManyToOne
    @JoinColumn
    private Voucher voucher;

    @Column
    private LocalDateTime checkin;

    @Column
    private LocalDateTime checkout;

    @Column
    @Enumerated(EnumType.STRING)
    private StatusSu status;

    public enum TypeBooking {
        HOURLY,
        DAILY,
        NIGHTLY
    }
}

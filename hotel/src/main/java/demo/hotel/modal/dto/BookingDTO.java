package demo.hotel.modal.dto;

import demo.hotel.modal.constant.StatusSu;
import demo.hotel.modal.entity.Booking;
import lombok.Data;

import static demo.hotel.support.MethodSupport.buildLocalDateTime;
import static demo.hotel.support.MethodSupport.convertStringToEnum;

@Data
public class BookingDTO {
    private int id;
    private String type;
    private int accountId;
    private int roomId;
    private int voucherId;
    private String checkIn;
    private String checkOut;
    private String checkinDate;
    private String checkinTime;
    private String checkoutDate;
    private String checkoutTime;
    private String status;

    public BookingDTO(Booking booking) {
        this.id = booking.getId();
        this.type = booking.getType() != null ? booking.getType().toString() : "not found";
        this.accountId = booking.getAccount() != null ? booking.getAccount().getId() : 0;
        this.roomId = booking.getRoom() != null ? booking.getRoom().getId() : 0;
        this.voucherId = booking.getVoucher() != null ? booking.getVoucher().getId() : 0;
        this.checkIn = booking.getCheckin() != null ? booking.getCheckin().toString() : "not found";
        this.checkOut = booking.getCheckout() != null ? booking.getCheckout().toString() : "not found";
        this.status = booking.getStatus() != null ? booking.getStatus().toString() : "not found";
    }

    public Booking addBooking(){
        Booking booking = new Booking();
        booking.setType(convertStringToEnum(Booking.TypeBooking.class, this.type));
        booking.setCheckin(buildLocalDateTime(checkinDate, checkinTime));
        booking.setCheckout(buildLocalDateTime(checkoutDate, checkoutTime));
        booking.setStatus(StatusSu.PENDING);
        return booking;
    }
}

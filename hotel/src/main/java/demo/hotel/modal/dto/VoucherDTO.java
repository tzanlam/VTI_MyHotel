package demo.hotel.modal.dto;

import demo.hotel.modal.constant.StatusOL;
import demo.hotel.modal.entity.Voucher;
import lombok.Data;

import static demo.hotel.support.MethodSupport.buildLocalDateTime;

@Data
public class VoucherDTO {
    private int id;
    private String name;
    private int amount;
    private int point;
    private String expiryDateTime;
    private String expiryDate;
    private String expiryTime;
    private String status;
    private String created;
    private String updated;

    public VoucherDTO(Voucher voucher) {
        this.id = voucher.getId();
        this.name = voucher.getName();
        this.amount = voucher.getAmount();
        this.point = voucher.getPoint();
        this.expiryDateTime = voucher.getExpiry() != null ?
                String.format("%1$td:%1$tm:%1$tY and %1$tH:%1$tM", voucher.getExpiry()) : "not found";
        this.status = voucher.getStatus() != null ? voucher.getStatus().toString() : "not found";
        this.created = voucher.getCreated() != null ? voucher.getCreated().toString() : "not found";
        this.updated = voucher.getModified() != null ? voucher.getModified().toString() : "not found";
    }

    public Voucher addVoucher() {
        Voucher voucher = new Voucher();
        voucher.setName(this.name);
        voucher.setAmount(this.amount);
        voucher.setPoint(this.point);
        voucher.setExpiry(buildLocalDateTime(this.expiryDate, this.expiryTime));
        voucher.setStatus(StatusOL.CLOSED);
        return voucher;
    }

    public void updateVoucher(Voucher voucher) {
        voucher.setName(this.name);
        voucher.setAmount(this.amount);
        voucher.setPoint(this.point);
        voucher.setExpiry(buildLocalDateTime(this.expiryDate, this.expiryTime));
        voucher.setStatus(StatusOL.CLOSED);
    }
}

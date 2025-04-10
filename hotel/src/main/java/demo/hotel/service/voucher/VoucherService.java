package demo.hotel.service.voucher;

import demo.hotel.modal.dto.VoucherDTO;

import java.util.List;

public interface VoucherService {
    // get
    List<VoucherDTO> viewVouchers();
    VoucherDTO viewVoucherById(int id);

    // post
    VoucherDTO createVoucher(VoucherDTO dto);

    // put
    VoucherDTO updateVoucher(VoucherDTO dto, int id);
    VoucherDTO updateDateVoucher(String date, String time, int id);
    // delete
    VoucherDTO deleteVoucher(int id);
}

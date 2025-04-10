package demo.hotel.service.voucher;

import demo.hotel.modal.constant.StatusOL;
import demo.hotel.modal.dto.VoucherDTO;
import demo.hotel.modal.entity.Voucher;
import demo.hotel.repository.VoucherRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static demo.hotel.support.MethodSupport.buildLocalDateTime;

@Service
public class VoucherServiceImpl implements VoucherService {
    private final VoucherRepository voucherRepository;

    public VoucherServiceImpl(VoucherRepository voucherRepository) {
        this.voucherRepository = voucherRepository;
    }

    @Override
    public List<VoucherDTO> viewVouchers() {
        return voucherRepository.findAll().stream().map(VoucherDTO::new).collect(Collectors.toList());
    }

    @Override
    public VoucherDTO viewVoucherById(int id) {
        Voucher voucher = voucherRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Voucher not found")
        );
        return new VoucherDTO(voucher);
    }

    @Override
    public VoucherDTO createVoucher(VoucherDTO dto) {
        try{
            Voucher voucher = dto.addVoucher();
            voucherRepository.save(voucher);
            return new VoucherDTO(voucher);
        }catch(Exception e){
            throw new RuntimeException("Error creating voucher", e);
        }
    }

    @Override
    public VoucherDTO updateVoucher(VoucherDTO dto, int id) {
        Voucher voucher = voucherRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Voucher not found")
        );
        try{
            dto.updateVoucher(voucher);
            voucherRepository.save(voucher);
            return new VoucherDTO(voucher);
        }catch(Exception e){
            throw new RuntimeException("Error updating voucher", e);
        }
    }

    @Override
    public VoucherDTO updateDateVoucher(String date, String time, int id) {
        Voucher voucher = voucherRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Voucher not found")
        );
        voucher.setExpiry(buildLocalDateTime(date, time));
        voucherRepository.save(voucher);
        return new VoucherDTO(voucher);
    }

    @Override
    public VoucherDTO deleteVoucher(int id) {
        Voucher voucher = voucherRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Voucher not found")
        );
        try{
            voucher.setStatus(StatusOL.CLOSED);
            voucherRepository.save(voucher);
            return new VoucherDTO(voucher);
        }catch(Exception e){
            throw new RuntimeException("Error deleting voucher", e);
        }
    }
}

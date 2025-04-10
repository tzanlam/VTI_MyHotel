package demo.hotel.controller;

import demo.hotel.modal.dto.VoucherDTO;
import demo.hotel.service.voucher.VoucherService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
public class VoucherController {
    private final VoucherService voucherService;

    public VoucherController(VoucherService voucherService) {
        this.voucherService = voucherService;
    }

    @GetMapping("/getVouchers")
    public ResponseEntity<?> listVouchers() {
        try{
            return ResponseEntity.ok(voucherService.viewVouchers());
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/getVoucherById")
    public ResponseEntity<?> viewVoucherById(@RequestParam int id) {
        try{
            return ResponseEntity.ok(voucherService.viewVoucherById(id));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/postVoucher")
    public ResponseEntity<?> post(@RequestBody VoucherDTO dto) {
        try{
            return ResponseEntity.ok(voucherService.createVoucher(dto));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/putVoucher")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> put(@RequestBody VoucherDTO dto, @RequestParam("voucherId") int id) {
        try{
            return ResponseEntity.ok(voucherService.updateVoucher(dto, id));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/putExpiryVoucher")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> putExpiry(@RequestParam("date") String date, @RequestParam("voucherId") int id, @RequestParam("time") String time) {
        try{
            return ResponseEntity.ok(voucherService.updateDateVoucher(date, time, id));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/deleteVoucher")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> deleteVoucher(@RequestParam("id") int id) {
        try{
            return ResponseEntity.ok(voucherService.deleteVoucher(id));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

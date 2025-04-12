package demo.hotel.controller;

import demo.hotel.modal.dto.BookingDTO;
import demo.hotel.modal.dto.SearchCriteria;
import demo.hotel.service.booking.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class BookingController {
    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/getBookings")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> getBookings() {
        try{
            return ResponseEntity.ok(bookingService.getBookings());
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/getBookingById")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> getBookingById(@RequestParam("bookingId") int id) {
        try{
            return ResponseEntity.ok(bookingService.getBooking(id));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/getBookingsByAccountId")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> getBookingsByAccountId(@RequestParam("accountId") int accountId) {
        try{
            return ResponseEntity.ok(bookingService.getByAccountId(accountId));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/searchBooking")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> searchBooking(@RequestParam("value")List<SearchCriteria> values, @RequestParam("sortBy") String sortBy) {
        try{
            return ResponseEntity.ok(bookingService.getBySpecification(values, sortBy));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/postBooking")
    public ResponseEntity<?> postBooking(@RequestBody BookingDTO dto) {
        try{
            return ResponseEntity.ok(bookingService.createBooking(dto));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/putStatusBooking")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> putStatusBooking(@RequestParam("bookingId")int bookingId, @RequestParam("status") String status) {
        try{
            return ResponseEntity.ok(bookingService.statusBooking(bookingId, status));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

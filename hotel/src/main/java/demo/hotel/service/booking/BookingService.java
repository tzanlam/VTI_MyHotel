package demo.hotel.service.booking;

import demo.hotel.modal.dto.BookingDTO;
import demo.hotel.modal.dto.SearchCriteria;

import java.util.List;

public interface BookingService {
    // get
    List<BookingDTO> getBookings();
    BookingDTO getBooking(int id);
    List<BookingDTO> getByAccountId(int accountId);
    List<BookingDTO> getBySpecification(List<SearchCriteria> value, String sortBy);

    // post
    BookingDTO createBooking(BookingDTO bookingDTO);

    //update status
    BookingDTO statusBooking(int id, String status);
}

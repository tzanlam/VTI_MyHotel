package demo.hotel.service.booking;

import demo.hotel.modal.constant.StatusSu;
import demo.hotel.modal.dto.BookingDTO;
import demo.hotel.modal.dto.SearchCriteria;
import demo.hotel.modal.entity.Booking;
import demo.hotel.repository.AccountRepository;
import demo.hotel.repository.BookingRepository;
import demo.hotel.support.MethodSpecification;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static demo.hotel.support.MethodSupport.convertStringToEnum;

@Service
public class BookingServiceImpl implements BookingService {
    private final BookingRepository bookingRepository;
    private final AccountRepository accountRepository;

    public BookingServiceImpl(BookingRepository bookingRepository, AccountRepository accountRepository) {
        this.bookingRepository = bookingRepository;
        this.accountRepository = accountRepository;
    }

    @Override
    public List<BookingDTO> getBookings() {
        return bookingRepository.findAll().stream().map(BookingDTO::new).collect(Collectors.toList());
    }

    @Override
    public BookingDTO getBooking(int id) {
        Booking booking = bookingRepository.findById(id).orElseThrow(
                () -> new NullPointerException("Booking with id " + id + " not found")
        );
        return new BookingDTO(booking);
    }

    @Override
    public List<BookingDTO> getByAccountId(int accountId) {
        if (accountRepository.existsById(accountId)) {
        List<Booking> bookings = bookingRepository.findByAccountId(accountId).orElseThrow(
                () -> new NullPointerException("Booking not found")
        );
        return bookings.stream().map(BookingDTO::new).collect(Collectors.toList());
    }
        return new ArrayList<>();
    }

    @Override
    public List<BookingDTO> getBySpecification(List<SearchCriteria> value, String sortBy) {
        MethodSpecification<Booking> methodSpecification = new MethodSpecification<>();
        Specification<Booking> specification = methodSpecification.buildQuery(value);
//        Sort sort = Sort.by(Sort.Direction.ASC, sortBy);
        return bookingRepository.findAll((Sort) specification).stream()
                .map(BookingDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    public BookingDTO createBooking(BookingDTO bookingDTO) {
        try {
            Booking booking = bookingDTO.addBooking();
            bookingRepository.save(booking);
            return new BookingDTO(booking);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public BookingDTO statusBooking(int id, String status) {
        Booking booking = bookingRepository.findById(id).orElseThrow(
                () -> new NullPointerException("Booking with id " + id + " not found")
        );
        try{
            booking.setStatus(convertStringToEnum(StatusSu.class, status));
            bookingRepository.save(booking);
            return new BookingDTO(booking);
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }
}

package demo.hotel.service.reiview;

import demo.hotel.modal.dto.ReviewDTO;
import demo.hotel.modal.entity.Booking;
import demo.hotel.modal.entity.Review;
import demo.hotel.repository.AccountRepository;
import demo.hotel.repository.BookingRepository;
import demo.hotel.repository.ReviewRepository;
import demo.hotel.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;
    private final RoomRepository roomRepository;
    private final AccountRepository accountRepository;
    private final BookingRepository bookingRepository;

    public ReviewServiceImpl(ReviewRepository reviewRepository, RoomRepository roomRepository, AccountRepository accountRepository, BookingRepository bookingRepository) {
        this.reviewRepository = reviewRepository;
        this.roomRepository = roomRepository;
        this.accountRepository = accountRepository;
        this.bookingRepository = bookingRepository;
    }

    @Override
    public List<ReviewDTO> getReviews() {
        return reviewRepository.findAll().stream().map(ReviewDTO::new).collect(Collectors.toList());
    }

    @Override
    public ReviewDTO getReviewById(int id) {
        Review review = reviewRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("Review not found")
        );
        return new ReviewDTO(review);
    }

    @Override
    public List<ReviewDTO> getByRoomId(int roomId) {
        List<Review> review = roomRepository.findReviewByRoomId(roomId).orElseThrow(
                () -> new IllegalArgumentException("Review not found with room id: " + roomId)
        );
        return review.stream().map(ReviewDTO::new).collect(Collectors.toList());
    }

    @Override
    public List<ReviewDTO> getByAccountId(int accountId) {
        List<Review> reviews = accountRepository.findReviewsByAccountId(accountId).orElseThrow(
                () -> new NullPointerException("review not found with account "+accountId)
        );
        return reviews.stream().map(ReviewDTO::new).collect(Collectors.toList());
    }

    @Override
    public ReviewDTO createReview(ReviewDTO dto) {
        Booking booking = bookingRepository.findById(dto.getBookingId()).orElseThrow(
                () -> new IllegalArgumentException("Booking not found")
        );
        try{
            Review review = new Review();
            dto.addReview(review);
            review.setBooking(booking);
            review.setRoom(booking.getRoom());
            review.setAccount(booking.getAccount());
            reviewRepository.save(review);
            return new ReviewDTO(review);
        }catch (Exception e){
            throw new IllegalArgumentException("Review could not be created");
        }
    }

    @Override
    public ReviewDTO updateReview(ReviewDTO dto, int id) {
        Review review = reviewRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("Review not found with id: " + id)
        );
        try {
            dto.addReview(review);
            reviewRepository.save(review);
            return new ReviewDTO(review);
        }catch(Exception e){
            throw new IllegalArgumentException("Review could not be updated");
        }
    }

    @Override
    public String deleteReview(int id) {
        Review review = reviewRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("Review not found with id: " + id)
        );
        try{
            reviewRepository.delete(review);
            return "Review successfully deleted";
        }catch(Exception e){
            throw new IllegalArgumentException("Review could not be deleted");
        }
    }
}

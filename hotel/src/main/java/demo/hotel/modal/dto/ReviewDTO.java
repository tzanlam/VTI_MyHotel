package demo.hotel.modal.dto;

import demo.hotel.modal.entity.Review;
import lombok.Data;

@Data
public class ReviewDTO {
    private int id;
    private int bookingId;
    private int roomId;
    private int accountId;
    private int rating;
    private String comment;

    public ReviewDTO(Review review) {
        this.id = review.getId();
        this.roomId = review.getRoom() != null ? review.getRoom().getId() : 0;
        this.bookingId = review.getBooking() != null ? review.getBooking().getId() : 0;
        this.accountId = review.getAccount() != null ? review.getAccount().getId() : 0;
        this.rating = (int) review.getRating();
        this.comment = review.getComment();
    }

    public void addReview(Review review) {
        review.setRating(this.rating);
        review.setComment(this.comment);
    }
}

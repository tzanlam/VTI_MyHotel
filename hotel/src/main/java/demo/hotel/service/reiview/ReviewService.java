package demo.hotel.service.reiview;

import demo.hotel.modal.dto.ReviewDTO;

import java.util.List;

public interface ReviewService {
    // get
    List<ReviewDTO> getReviews();
    ReviewDTO getReviewById(int id);
    List<ReviewDTO> getByRoomId(int roomId);
    List<ReviewDTO> getByAccountId(int accountId);

    //post
    ReviewDTO createReview(ReviewDTO dto);

    // put
    ReviewDTO updateReview(ReviewDTO dto, int id);

    // delete
    String deleteReview(int id);
}

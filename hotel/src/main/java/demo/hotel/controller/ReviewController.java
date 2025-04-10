package demo.hotel.controller;

import demo.hotel.modal.dto.ReviewDTO;
import demo.hotel.service.reiview.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
public class ReviewController {
    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/getReviews")
    public ResponseEntity<?> findAllReviews() {
        try{
            return ResponseEntity.ok(reviewService.getReviews());
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/getReviewById")
    public ResponseEntity<?> findReviewById(@RequestParam("reviewId") int id) {
        try{
            return ResponseEntity.ok(reviewService.getReviewById(id));
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/getReviewByRoomId")
    public ResponseEntity<?> findReviewByRoomId(@RequestParam("roomId") int roomId) {
        try{
            return ResponseEntity.ok(reviewService.getByRoomId(roomId));
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/getReviewByAccountId")
    public ResponseEntity<?> findReviewByAccountId(@RequestParam("accountId") int accountId) {
        try{
            return ResponseEntity.ok(reviewService.getByAccountId(accountId));
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/postReview")
    public ResponseEntity<?> postReview(@RequestBody ReviewDTO dto){
        try{
            return ResponseEntity.ok(reviewService.createReview(dto));
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PutMapping("/putReview")
    public ResponseEntity<?> putReview(@RequestBody ReviewDTO dto, @RequestParam("reviewId")int id){
        try{
            return ResponseEntity.ok(reviewService.updateReview(dto,id));
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @DeleteMapping("/deleteReview")
    public ResponseEntity<?> deleteReview(@RequestParam("reviewId" ) int id){
        try{
            return ResponseEntity.ok(reviewService.deleteReview(id));
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

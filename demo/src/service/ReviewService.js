import api from "../config/axios";

export const ReviewService = {
   fetchReviews() {
      return api.get("getReviews");
   },
   fetchReviewById(reviewId) {
      return api.get(`getReviewById/${reviewId}`);
   },
   fetchReviewByRoom(roomId) {
      return api.get(`getReviewByRoomId/${roomId}`);
   },
   getReviewByAccount(accountId) {
      return api.get(`getReviewByAccountId/${accountId}`);
   },
   postReview(reviewRequest) {
      return api.post("postReview", reviewRequest);
   },
   putReview(reviewId, reviewRequest) {
      return api.put(`putReview/${reviewId}`, reviewRequest); 
   },
   deleteReview(reviewId) {
      return api.put(`deleteReview/${reviewId}`); 
   }
};

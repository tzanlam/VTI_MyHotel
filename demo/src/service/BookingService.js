import api from "../config/axios"

export const BookingService = {
   fetchBookings(){
      return api.get("getBookings")
   },
   fetchBookingById(bookingId){
      return api.get(`getBookingById?bookingId=${bookingId}`)
   },
   fetchBookingByAccount(accountId){
      return api.get(`getBookingByAccountId?accountId=${accountId}`)
   },
   fetchBookingByDate(startDate, endDate){
      return api.get(`getBookingByDate?startDate=${startDate}&endDate=${endDate}`)
   },
   postBooking(bookingRequest){
      return api.post("postBooking", bookingRequest)
   },
   putStatusBooking(bookingId, status){
      return api.put(`putStatusBooking?bookingId=${bookingId}&status=${status}`)
   }
}
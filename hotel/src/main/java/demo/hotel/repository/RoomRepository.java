package demo.hotel.repository;

import demo.hotel.modal.entity.Review;
import demo.hotel.modal.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Integer> {
    @Query("select r.reviews from Room r where r.id = :roomId")
    Optional<List<Review>> findReviewByRoomId(@Param("roomId") int roomId);

    @Query("select r from Room r where r.quantity > 0 and r.date >= :startDate and r.date <= :endDate")
    Optional<List<Room>> findAvailableRoom(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
}

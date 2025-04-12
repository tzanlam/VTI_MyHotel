package demo.hotel.repository;

import demo.hotel.modal.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {
    @Query("select b from Booking b where b.account.id = :accountId")
    Optional<List<Booking>> findByAccountId(@Param("accountId") int accountId);
}

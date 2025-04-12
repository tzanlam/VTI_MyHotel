package demo.hotel.repository;

import demo.hotel.modal.entity.Account;
import demo.hotel.modal.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
    @Query("select a.reviews from Account a where a.id = :accountId")
    Optional<List<Review>> findReviewsByAccountId(@Param("accountId") int accountId);

    Account findByEmail(String email);
}

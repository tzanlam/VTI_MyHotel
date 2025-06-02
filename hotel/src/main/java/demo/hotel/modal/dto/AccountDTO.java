package demo.hotel.modal.dto;

import demo.hotel.modal.constant.StatusAc;
import demo.hotel.modal.entity.Account;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AccountDTO {
    private int id;
    private String email;
    private String fullName;
    private String phoneNumber;
    private String avatar;
    private String password;
    private String position;
    private int amountSpent;
    private int points;
    private String level;
    private String status;
    private String createdAt;
    private String updatedAt;


    public AccountDTO(Account account) {
        this.id = account.getId();
        this.email = account.getEmail();
        this.fullName = account.getFullName();
        this.avatar = account.getAvatar();
        this.position = account.getPosition() != null ?account.getPosition().toString() : "Not found";
        this.amountSpent = account.getAmountSpent();
        this.points = account.getPoints();
        this.level = account.getLevel() != null ? account.getLevel().toString() : "Not found";
        this.status = account.getStatus() != null ? account.getStatus().toString() : "Not found";
        this.createdAt = account.getCreated() != null ? account.getCreated().toString() : "Not found";
        this.updatedAt = account.getModified() != null ? account.getModified().toString() : "Not found";
    }

    public Account registerAdmin() {
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        Account account = new Account();
        account.setEmail(email);
        account.setPassword(encoder.encode(password));
        account.setFullName(fullName);
        account.setPhoneNumber(phoneNumber);
        account.setAvatar("not found");
        account.setPosition(Account.Position.ADMIN);
        account.setPoints(0);
        account.setLevel(Account.Level.ADMIN_CUSTOMER);
        account.setAmountSpent(0);
        account.setStatus(StatusAc.INACTIVE);
        return account;
    }

    public Account registerCustomer() {
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        Account account = new Account();
        account.setEmail(email);
        account.setPassword(encoder.encode(password));
        account.setFullName(fullName);
        account.setPhoneNumber(phoneNumber);
        account.setAvatar("not found");
        account.setPosition(Account.Position.USER);
        account.setPoints(0);
        account.setLevel(Account.Level.NEW_CUSTOMER);
        account.setAmountSpent(0);
        account.setStatus(StatusAc.INACTIVE);
        return account;
    }
    public void updateAccount(Account account) {
        account.setFullName(fullName);
        account.setPhoneNumber(phoneNumber);
        account.setAvatar(avatar);
        account.setModified(LocalDateTime.now());
    }

    public void updateEmail(Account account) {
        account.setEmail(email);
        account.setStatus(StatusAc.INACTIVE);
    }

    public void updatePassword(Account account) {
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        account.setPassword(encoder.encode(password));
    }
}

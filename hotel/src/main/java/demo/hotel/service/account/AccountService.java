package demo.hotel.service.account;

import demo.hotel.modal.dto.AccountDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface AccountService {
    // get
    List<AccountDTO> getAccounts();
    AccountDTO getAccountById(int id);

    // post
    AccountDTO registerAdmin(AccountDTO dto);
    AccountDTO registerUser(AccountDTO dto);

    // put
    AccountDTO updateAccount(AccountDTO dto, int id);
    AccountDTO updateEmail(AccountDTO dto, int id);
    AccountDTO updatePassword(AccountDTO dto, int id);
    AccountDTO addAvatar(MultipartFile file, int id) throws IOException;

    // delete
    AccountDTO deleteAccount(int id);
}

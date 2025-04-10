package demo.hotel.service.account;

import demo.hotel.configs.cloudinary.CloudinaryService;
import demo.hotel.modal.constant.StatusAc;
import demo.hotel.modal.entity.Account;
import demo.hotel.modal.dto.AccountDTO;
import demo.hotel.repository.AccountRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AccountServiceImpl implements AccountService {
    private final AccountRepository accountRepository;
    private final CloudinaryService cloudinaryService;

    public AccountServiceImpl(AccountRepository accountRepository, CloudinaryService cloudinaryService) {
        this.accountRepository = accountRepository;
        this.cloudinaryService = cloudinaryService;
    }

    @Override
    public List<AccountDTO> getAccounts() {
        return accountRepository.findAll().stream().map(AccountDTO::new).collect(Collectors.toList());
    }

    @Override
    public AccountDTO getAccountById(int id) {
        Account account = accountRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Account not found")
        );
        return new AccountDTO(account);
    }

    @Override
    public AccountDTO registerAdmin(AccountDTO dto) {
        try{
            Account account = dto.registerAdmin();
            accountRepository.save(account);
            return new AccountDTO(account);
        }catch (Exception e){
            throw new RuntimeException("Account not registered", e);
        }
    }

    @Override
    public AccountDTO registerUser(AccountDTO dto) {
        try {
            Account account = dto.registerCustomer();
            accountRepository.save(account);
            return new AccountDTO(account);
        }catch (Exception e){
            throw new RuntimeException("Account not registered", e);
        }
    }

    @Override
    public AccountDTO updateAccount(AccountDTO dto, int id) {
        Account account = accountRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Account not found")
        );
        try{
            dto.updateAccount(account);
            accountRepository.save(account);
            return new AccountDTO(account);
        }catch (Exception e){
            throw new RuntimeException("Account not updated", e);
        }
    }

    @Override
    public AccountDTO updateEmail(AccountDTO dto, int id) {
        Account account = accountRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Account not found")
        );
        try {
            dto.updateEmail(account);
            accountRepository.save(account);
            return new AccountDTO(account);
        }catch (Exception e){
            throw new RuntimeException("Account not updated", e);
        }
    }

    @Override
    public AccountDTO updatePassword(AccountDTO dto, int id) {
        Account account = accountRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Account not found")
        );
        try {
            dto.updatePassword(account);
            accountRepository.save(account);
            return new AccountDTO(account);
        }catch (Exception e){
            throw new RuntimeException("Account not updated", e);
        }
    }


    @Override
    public AccountDTO addAvatar(MultipartFile file, int id) throws IOException {
        Account account = accountRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Account not found")
        );
        account.setAvatar(cloudinaryService.upload(file));
        accountRepository.save(account);
        return new AccountDTO(account);
    }

    @Override
    public AccountDTO deleteAccount(int id) {
        Account account = accountRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Account not found")
        );
        account.setStatus(StatusAc.DELETED);
        accountRepository.save(account);
        return new AccountDTO(account);
    }
}

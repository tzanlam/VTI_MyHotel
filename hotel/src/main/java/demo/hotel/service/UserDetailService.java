package demo.hotel.service;

import demo.hotel.modal.entity.Account;
import demo.hotel.repository.AccountRepository;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class UserDetailService implements UserDetailsService {
    private final AccountRepository accountRepository;

    public UserDetailService( AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = accountRepository.findByEmail(username);
        if (account != null) {
            return new User(account.getEmail(), account.getPassword(), AuthorityUtils.createAuthorityList(account.getPosition().name()));
        }
        return null;
    }
}

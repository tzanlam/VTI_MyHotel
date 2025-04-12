package demo.hotel.service.auth;

import demo.hotel.configs.jwt.JwtTokenUtil;
import demo.hotel.modal.dto.AuthResponse;
import demo.hotel.modal.entity.Account;
import demo.hotel.repository.AccountRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
    private final UserDetailsService userDetailsService;
    private final JwtTokenUtil jwtTokenUtil;
    private final AccountRepository accountRepository;
    private final AuthenticationManager authenticationManager;

    public AuthServiceImpl(UserDetailsService userDetailsService, JwtTokenUtil jwtTokenUtil, AccountRepository accountRepository, AuthenticationManager authenticationManager) {
        this.userDetailsService = userDetailsService;
        this.jwtTokenUtil = jwtTokenUtil;
        this.accountRepository = accountRepository;
        this.authenticationManager = authenticationManager;
    }

    @Override
    public AuthResponse login(String email, String password) {
        Account account = accountRepository.findByEmail(email);
        if (account != null) {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(account.getEmail(), password));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            UserDetails userDetails = userDetailsService.loadUserByUsername(account.getEmail());
            String token = jwtTokenUtil.generateToken(userDetails);
            return new AuthResponse(token, account.getId(),email, userDetails.getAuthorities());
        }else {
            throw new NullPointerException("Account not found");
        }
    }
}

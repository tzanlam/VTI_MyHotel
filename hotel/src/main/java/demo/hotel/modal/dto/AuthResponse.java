package demo.hotel.modal.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private int accountId;
    private String email;
    private Collection<? extends GrantedAuthority> authorities;
}

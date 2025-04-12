package demo.hotel.service.auth;

import demo.hotel.modal.dto.AuthResponse;

public interface AuthService {
    AuthResponse login(String username, String password);
}

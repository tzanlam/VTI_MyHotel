package demo.hotel.controller;

import demo.hotel.modal.dto.AccountDTO;
import demo.hotel.service.account.AccountService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

@Repository
@CrossOrigin("*")
public class AccountController {
    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping("/getAccounts")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> findAllAccounts() {
        try {
            return ResponseEntity.ok(accountService.getAccounts());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @GetMapping("/getAccountById")
    @PreAuthorize("hasAnyAuthority('ADMIN','USER')")
    public ResponseEntity<?> findAccountById(@RequestParam("accountId") int accountId) {
        try {
            return ResponseEntity.ok(accountService.getAccountById(accountId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @PostMapping("/postAdmin")
    public ResponseEntity<?> postAdmin(@RequestBody AccountDTO request) {
        try {
            return ResponseEntity.ok(accountService.registerAdmin(request));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @PostMapping("/postUser")
    public ResponseEntity<?> postUser(@RequestBody AccountDTO request) {
        try {
            return ResponseEntity.ok(accountService.registerUser(request));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @PutMapping("/putAccount")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> putAccount(@RequestBody AccountDTO request, @RequestParam("accountId") int accountId) {
        try {
            return ResponseEntity.ok(accountService.updateAccount(request, accountId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @PutMapping("/putEmail")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> putEmail(@RequestBody AccountDTO request, @RequestParam("accountId") int accountId) {
        try {
            return ResponseEntity.ok(accountService.updateEmail(request, accountId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @PutMapping("/putPassword")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> putPassword(@RequestBody AccountDTO request, @RequestParam("accountId") int accountId) {
        try {
            return ResponseEntity.ok(accountService.updatePassword(request, accountId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @PutMapping("/deleteAccount")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> deleteAccount(@RequestParam("accountId") int accountId) {
        try {
            return ResponseEntity.ok(accountService.deleteAccount(accountId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }
}

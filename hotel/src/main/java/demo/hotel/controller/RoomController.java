package demo.hotel.controller;

import demo.hotel.modal.dto.RoomDTO;
import demo.hotel.service.room.RoomService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
public class RoomController {
    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping("/getRooms")
    public ResponseEntity<?> findAllRooms() {
        try{
            return ResponseEntity.ok(roomService.getAllRooms());
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/getRoomById")
    public ResponseEntity<?> findRoomById(@RequestParam ("roomId") int id) {
        try{
            return ResponseEntity.ok(roomService.getRoomById(id));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/postRoom")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> postRoom(@RequestBody RoomDTO dto) {
        try{
            return ResponseEntity.ok(roomService.createRoom(dto));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/putRoom")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> putRoom(@RequestBody RoomDTO dto, @RequestParam int roomId) {
        try{
            return ResponseEntity.ok(roomService.updateRoom(dto, roomId));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/putQuantityRoom")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> putQuantityRoom(@RequestParam("quantity")int quantity, @RequestParam("roomId") int roomId) {
        try{
            return ResponseEntity.ok(roomService.updateQuantity(roomId, quantity ));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/deleteRoom")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> deleteRoom(@RequestParam int roomId) {
        try{
            return ResponseEntity.ok(roomService.deleteRoom(roomId));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

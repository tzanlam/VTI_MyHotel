package demo.hotel.service.room;

import demo.hotel.modal.dto.RoomDTO;

import java.util.List;

public interface RoomService {
    // get
    List<RoomDTO> getAllRooms();
    RoomDTO getRoomById(int id);
    List<RoomDTO> getRoomAvailableByDate(String startDate, String endDate);
    // post
    RoomDTO createRoom(RoomDTO room);

    // put
    RoomDTO updateRoom(RoomDTO room, int id);
    RoomDTO updateQuantity(int id, int quantity);
    RoomDTO updateQuantityRoomByDate(int roomId, int quantity, String startDate, String endDate);

    // delete
    RoomDTO deleteRoom(int id);
}

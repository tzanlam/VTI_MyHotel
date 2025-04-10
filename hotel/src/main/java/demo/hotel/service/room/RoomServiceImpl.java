package demo.hotel.service.room;

import demo.hotel.modal.constant.StatusOL;
import demo.hotel.modal.dto.RoomDTO;
import demo.hotel.modal.entity.Room;
import demo.hotel.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoomServiceImpl implements RoomService {
    private final RoomRepository roomRepository;

    public RoomServiceImpl(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    @Override
    public List<RoomDTO> getAllRooms() {
        return roomRepository.findAll().stream().map(RoomDTO::new).collect(Collectors.toList());
    }

    @Override
    public RoomDTO getRoomById(int id) {
        Room room = roomRepository.findById(id).orElseThrow(
                () -> new NullPointerException("Room not found with id: " + id)
        );
        return new RoomDTO(room);
    }

    @Override
    public RoomDTO createRoom(RoomDTO room) {
        try{
            Room room1 = room.addRoom();
            roomRepository.save(room1);
            return new RoomDTO(room1);
        }catch (Exception e){
            throw new NullPointerException("Room could not be created");
        }
    }

    @Override
    public RoomDTO updateRoom(RoomDTO dto, int id) {
        Room room1 = roomRepository.findById(id).orElseThrow(
                () -> new NullPointerException("Room not found with id: " + id)
        );
        try{
            dto.updateRoom(room1);
            roomRepository.save(room1);
            return new RoomDTO(room1);
        }catch (Exception e){
            throw new NullPointerException("Room could not be updated");
        }
    }

    @Override
    public RoomDTO updateQuantity(int id, int quantity) {
        Room room = roomRepository.findById(id).orElseThrow(
                () -> new NullPointerException("Room not found with id: " + id)
        );
        try{
            room.setQuantity(quantity);
            roomRepository.save(room);
            return new RoomDTO(room);
        }catch (Exception e){
            throw new NullPointerException("Room quantity  could not be updated");
        }
    }

    @Override
    public RoomDTO deleteRoom(int id) {
        Room room = roomRepository.findById(id).orElseThrow(
                () -> new NullPointerException("Room not found with id: " + id)
        );
        try {
            room.setStatus(StatusOL.CLOSED);
            roomRepository.save(room);
            return new RoomDTO(room);
        }catch (Exception e){
            throw new NullPointerException("Room could not be deleted");
        }
    }
}

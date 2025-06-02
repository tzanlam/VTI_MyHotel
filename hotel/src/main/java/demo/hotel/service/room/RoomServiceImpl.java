package demo.hotel.service.room;

import demo.hotel.modal.constant.StatusOL;
import demo.hotel.modal.dto.RoomDTO;
import demo.hotel.modal.entity.Room;
import demo.hotel.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import static demo.hotel.support.MethodSupport.convertToLocalDate;

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
    public List<RoomDTO> getRoomAvailableByDate(String startDate, String endDate) {
        LocalDate start = convertToLocalDate(startDate);
        LocalDate end = convertToLocalDate(endDate);
        if (!start.isBefore(end)) {
            throw new IllegalArgumentException("Start date must be before end date");
        }
        List<Room> rooms = roomRepository.findAvailableRoom(start, end).orElseThrow(
                () -> new NullPointerException("Room not found by date you choose")
        );
        return rooms.stream().map(RoomDTO::new).collect(Collectors.toList());
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
    public RoomDTO updateQuantityRoomByDate(int roomId, int quantity, String startDate, String endDate) {
        Room room = roomRepository.findById(roomId).orElseThrow(
                () -> new NullPointerException("Room not found with id: " + roomId)
        );
        try {
            LocalDate start = convertToLocalDate(startDate);
            LocalDate end = convertToLocalDate(endDate);

            if (!start.isBefore(end)) {
                throw new IllegalArgumentException("Start date must be before end date");
            }

            List<LocalDate> dateRange = start.datesUntil(end.plusDays(1)).toList();
            for (LocalDate date : dateRange) {
                room.setDate(date);
                room.setQuantity(quantity);
                roomRepository.save(room);
            }

            return new RoomDTO(room);
        } catch (Exception e) {
            throw new RuntimeException("Can't update quantity room by date you choose");
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

package demo.hotel.modal.dto;

import demo.hotel.modal.constant.StatusOL;
import demo.hotel.modal.entity.Room;
import lombok.Data;
import lombok.NoArgsConstructor;


import static demo.hotel.support.MethodSupport.convertToLocalDate;

@Data
@NoArgsConstructor
public class RoomDTO {
    private int id;
    private String name;
    private String image;
    private String description;
    private int quantity;
    private int priceDay;
    private int priceNight;
    private int priceFirstHour;
    private int priceNextHour;
    private String date;
    private String createdDate;
    private String updatedDate;
    private String status;

    public RoomDTO(Room room) {
        this.id = room.getId();
        this.name = room.getName();
        this.description = room.getDescription();
        this.quantity = room.getQuantity();
        this.priceDay = room.getPriceDay();
        this.priceNight = room.getPriceNight();
        this.priceFirstHour = room.getPriceFirstHour();
        this.image = room.getImage();
        this.priceNextHour = room.getPriceNextHour();
        this.date = room.getDate() != null ? room.getDate().toString() : "not found";
        this.createdDate = room.getCreated() != null ? room.getCreated().toString() : "not found";
        this.updatedDate = room.getModified() != null ? room.getModified().toString() : "not found";
        this.status = room.getStatus() != null ? room.getStatus().toString() : "not found";
    }

    public Room addRoom(){
        Room room = new Room();
        populate(room);
        return room;
    }

    public void updateRoom(Room room){
        populate(room);
    }

    private void populate(Room room) {
        room.setName(this.name);
        room.setDescription(this.description);
        room.setQuantity(this.quantity);
        room.setPriceDay(this.priceDay);
        room.setPriceNight(this.priceNight);
        room.setPriceFirstHour(this.priceFirstHour);
        room.setImage(this.image);
        room.setDate(convertToLocalDate(date));
        room.setPriceNextHour(this.priceNextHour);
        room.setStatus(StatusOL.CLOSED);
    }
}

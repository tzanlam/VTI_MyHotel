package demo.hotel.modal.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class KafkaEvent {
    private String topic;
    private String message;

    public String addAccount(AccountDTO  dto){
        KafkaEvent kafkaEvent = new KafkaEvent();
        kafkaEvent.setTopic("new account created");
        kafkaEvent.setMessage("name: "+dto.getFullName());
        return kafkaEvent.toString();
    }
}

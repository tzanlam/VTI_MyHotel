package demo.hotel.modal.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SearchCriteria {
    private String key;
    private String value;
    private SearchOperation operation;

    public enum SearchOperation {
        EQUAL, LIKE, GREATER_THAN, LESS_THAN
    }
}

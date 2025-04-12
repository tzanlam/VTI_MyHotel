package demo.hotel.support;

import demo.hotel.modal.dto.SearchCriteria;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class MethodSpecification<T> {
    public Specification<T> buildQuery(List<SearchCriteria> criteriaList){
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            for (SearchCriteria criteria : criteriaList) {
                switch (criteria.getOperation()) {
                    case EQUAL:
                        predicates.add(criteriaBuilder.equal(root.get(criteria.getKey()), criteria.getValue()));
                        break;
                    case LIKE:
                        predicates.add(criteriaBuilder.like(root.get(criteria.getKey()), "%" + criteria.getValue() + "%"));
                        break;
                    case GREATER_THAN:
                        predicates.add(criteriaBuilder.greaterThan(root.get(criteria.getKey()), criteria.getValue()));
                        break;
                    case LESS_THAN:
                        predicates.add(criteriaBuilder.lessThan(root.get(criteria.getKey()), criteria.getValue()));
                        break;
                }
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
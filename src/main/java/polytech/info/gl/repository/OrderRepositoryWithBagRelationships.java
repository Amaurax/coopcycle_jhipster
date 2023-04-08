package polytech.info.gl.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import polytech.info.gl.domain.Order;

public interface OrderRepositoryWithBagRelationships {
    Optional<Order> fetchBagRelationships(Optional<Order> order);

    List<Order> fetchBagRelationships(List<Order> orders);

    Page<Order> fetchBagRelationships(Page<Order> orders);
}

package polytech.info.gl.repository;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.hibernate.annotations.QueryHints;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import polytech.info.gl.domain.Order;

/**
 * Utility repository to load bag relationships based on https://vladmihalcea.com/hibernate-multiplebagfetchexception/
 */
public class OrderRepositoryWithBagRelationshipsImpl implements OrderRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<Order> fetchBagRelationships(Optional<Order> order) {
        return order.map(this::fetchProducts);
    }

    @Override
    public Page<Order> fetchBagRelationships(Page<Order> orders) {
        return new PageImpl<>(fetchBagRelationships(orders.getContent()), orders.getPageable(), orders.getTotalElements());
    }

    @Override
    public List<Order> fetchBagRelationships(List<Order> orders) {
        return Optional.of(orders).map(this::fetchProducts).orElse(Collections.emptyList());
    }

    Order fetchProducts(Order result) {
        return entityManager
            .createQuery("select order from Order order left join fetch order.products where order is :order", Order.class)
            .setParameter("order", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<Order> fetchProducts(List<Order> orders) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, orders.size()).forEach(index -> order.put(orders.get(index).getId(), index));
        List<Order> result = entityManager
            .createQuery("select distinct order from Order order left join fetch order.products where order in :orders", Order.class)
            .setParameter("orders", orders)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }
}

package polytech.info.gl.service.mapper;

import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;
import polytech.info.gl.domain.Client;
import polytech.info.gl.domain.Courier;
import polytech.info.gl.domain.Order;
import polytech.info.gl.domain.Product;
import polytech.info.gl.domain.Seller;
import polytech.info.gl.service.dto.ClientDTO;
import polytech.info.gl.service.dto.CourierDTO;
import polytech.info.gl.service.dto.OrderDTO;
import polytech.info.gl.service.dto.ProductDTO;
import polytech.info.gl.service.dto.SellerDTO;

/**
 * Mapper for the entity {@link Order} and its DTO {@link OrderDTO}.
 */
@Mapper(componentModel = "spring")
public interface OrderMapper extends EntityMapper<OrderDTO, Order> {
    @Mapping(target = "client", source = "client", qualifiedByName = "clientId")
    @Mapping(target = "seller", source = "seller", qualifiedByName = "sellerId")
    @Mapping(target = "courier", source = "courier", qualifiedByName = "courierId")
    @Mapping(target = "products", source = "products", qualifiedByName = "productIdSet")
    OrderDTO toDto(Order s);

    @Mapping(target = "removeProducts", ignore = true)
    Order toEntity(OrderDTO orderDTO);

    @Named("clientId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ClientDTO toDtoClientId(Client client);

    @Named("sellerId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    SellerDTO toDtoSellerId(Seller seller);

    @Named("courierId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CourierDTO toDtoCourierId(Courier courier);

    @Named("productId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ProductDTO toDtoProductId(Product product);

    @Named("productIdSet")
    default Set<ProductDTO> toDtoProductIdSet(Set<Product> product) {
        return product.stream().map(this::toDtoProductId).collect(Collectors.toSet());
    }
}

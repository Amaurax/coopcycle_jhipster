package polytech.info.gl.service.mapper;

import org.mapstruct.*;
import polytech.info.gl.domain.Product;
import polytech.info.gl.domain.Seller;
import polytech.info.gl.service.dto.ProductDTO;
import polytech.info.gl.service.dto.SellerDTO;

/**
 * Mapper for the entity {@link Product} and its DTO {@link ProductDTO}.
 */
@Mapper(componentModel = "spring")
public interface ProductMapper extends EntityMapper<ProductDTO, Product> {
    @Mapping(target = "seller", source = "seller", qualifiedByName = "sellerId")
    ProductDTO toDto(Product s);

    @Named("sellerId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    SellerDTO toDtoSellerId(Seller seller);
}

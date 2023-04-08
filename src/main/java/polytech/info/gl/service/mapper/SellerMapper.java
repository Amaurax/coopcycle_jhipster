package polytech.info.gl.service.mapper;

import org.mapstruct.*;
import polytech.info.gl.domain.Cooperative;
import polytech.info.gl.domain.Seller;
import polytech.info.gl.service.dto.CooperativeDTO;
import polytech.info.gl.service.dto.SellerDTO;

/**
 * Mapper for the entity {@link Seller} and its DTO {@link SellerDTO}.
 */
@Mapper(componentModel = "spring")
public interface SellerMapper extends EntityMapper<SellerDTO, Seller> {
    @Mapping(target = "cooperative", source = "cooperative", qualifiedByName = "cooperativeId")
    SellerDTO toDto(Seller s);

    @Named("cooperativeId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CooperativeDTO toDtoCooperativeId(Cooperative cooperative);
}

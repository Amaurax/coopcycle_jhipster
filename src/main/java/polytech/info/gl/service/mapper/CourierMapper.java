package polytech.info.gl.service.mapper;

import org.mapstruct.*;
import polytech.info.gl.domain.Cooperative;
import polytech.info.gl.domain.Courier;
import polytech.info.gl.service.dto.CooperativeDTO;
import polytech.info.gl.service.dto.CourierDTO;

/**
 * Mapper for the entity {@link Courier} and its DTO {@link CourierDTO}.
 */
@Mapper(componentModel = "spring")
public interface CourierMapper extends EntityMapper<CourierDTO, Courier> {
    @Mapping(target = "cooperative", source = "cooperative", qualifiedByName = "cooperativeId")
    CourierDTO toDto(Courier s);

    @Named("cooperativeId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CooperativeDTO toDtoCooperativeId(Cooperative cooperative);
}

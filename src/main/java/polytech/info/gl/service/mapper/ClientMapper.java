package polytech.info.gl.service.mapper;

import org.mapstruct.*;
import polytech.info.gl.domain.Client;
import polytech.info.gl.domain.Cooperative;
import polytech.info.gl.service.dto.ClientDTO;
import polytech.info.gl.service.dto.CooperativeDTO;

/**
 * Mapper for the entity {@link Client} and its DTO {@link ClientDTO}.
 */
@Mapper(componentModel = "spring")
public interface ClientMapper extends EntityMapper<ClientDTO, Client> {
    @Mapping(target = "cooperative", source = "cooperative", qualifiedByName = "cooperativeId")
    ClientDTO toDto(Client s);

    @Named("cooperativeId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CooperativeDTO toDtoCooperativeId(Cooperative cooperative);
}

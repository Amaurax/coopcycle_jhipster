package polytech.info.gl.service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import polytech.info.gl.domain.Seller;
import polytech.info.gl.repository.SellerRepository;
import polytech.info.gl.service.dto.SellerDTO;
import polytech.info.gl.service.mapper.SellerMapper;

/**
 * Service Implementation for managing {@link Seller}.
 */
@Service
@Transactional
public class SellerService {

    private final Logger log = LoggerFactory.getLogger(SellerService.class);

    private final SellerRepository sellerRepository;

    private final SellerMapper sellerMapper;

    public SellerService(SellerRepository sellerRepository, SellerMapper sellerMapper) {
        this.sellerRepository = sellerRepository;
        this.sellerMapper = sellerMapper;
    }

    /**
     * Save a seller.
     *
     * @param sellerDTO the entity to save.
     * @return the persisted entity.
     */
    public SellerDTO save(SellerDTO sellerDTO) {
        log.debug("Request to save Seller : {}", sellerDTO);
        Seller seller = sellerMapper.toEntity(sellerDTO);
        seller = sellerRepository.save(seller);
        return sellerMapper.toDto(seller);
    }

    /**
     * Update a seller.
     *
     * @param sellerDTO the entity to save.
     * @return the persisted entity.
     */
    public SellerDTO update(SellerDTO sellerDTO) {
        log.debug("Request to update Seller : {}", sellerDTO);
        Seller seller = sellerMapper.toEntity(sellerDTO);
        seller = sellerRepository.save(seller);
        return sellerMapper.toDto(seller);
    }

    /**
     * Partially update a seller.
     *
     * @param sellerDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<SellerDTO> partialUpdate(SellerDTO sellerDTO) {
        log.debug("Request to partially update Seller : {}", sellerDTO);

        return sellerRepository
            .findById(sellerDTO.getId())
            .map(existingSeller -> {
                sellerMapper.partialUpdate(existingSeller, sellerDTO);

                return existingSeller;
            })
            .map(sellerRepository::save)
            .map(sellerMapper::toDto);
    }

    /**
     * Get all the sellers.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<SellerDTO> findAll() {
        log.debug("Request to get all Sellers");
        return sellerRepository.findAll().stream().map(sellerMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one seller by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<SellerDTO> findOne(Long id) {
        log.debug("Request to get Seller : {}", id);
        return sellerRepository.findById(id).map(sellerMapper::toDto);
    }

    /**
     * Delete the seller by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Seller : {}", id);
        sellerRepository.deleteById(id);
    }
}

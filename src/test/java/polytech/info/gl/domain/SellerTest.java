package polytech.info.gl.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import polytech.info.gl.web.rest.TestUtil;

class SellerTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Seller.class);
        Seller seller1 = new Seller();
        seller1.setId(1L);
        Seller seller2 = new Seller();
        seller2.setId(seller1.getId());
        assertThat(seller1).isEqualTo(seller2);
        seller2.setId(2L);
        assertThat(seller1).isNotEqualTo(seller2);
        seller1.setId(null);
        assertThat(seller1).isNotEqualTo(seller2);
    }
}

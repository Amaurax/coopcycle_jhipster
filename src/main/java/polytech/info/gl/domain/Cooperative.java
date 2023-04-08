package polytech.info.gl.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Cooperative.
 */
@Entity
@Table(name = "cooperative")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Cooperative implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "address")
    private String address;

    @Column(name = "director")
    private String director;

    @OneToMany(mappedBy = "cooperative")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "cooperative" }, allowSetters = true)
    private Set<Client> clients = new HashSet<>();

    @OneToMany(mappedBy = "cooperative")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "cooperative", "products" }, allowSetters = true)
    private Set<Seller> sellers = new HashSet<>();

    @OneToMany(mappedBy = "cooperative")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "cooperative" }, allowSetters = true)
    private Set<Courier> couriers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Cooperative id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Cooperative name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return this.address;
    }

    public Cooperative address(String address) {
        this.setAddress(address);
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDirector() {
        return this.director;
    }

    public Cooperative director(String director) {
        this.setDirector(director);
        return this;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public Set<Client> getClients() {
        return this.clients;
    }

    public void setClients(Set<Client> clients) {
        if (this.clients != null) {
            this.clients.forEach(i -> i.setCooperative(null));
        }
        if (clients != null) {
            clients.forEach(i -> i.setCooperative(this));
        }
        this.clients = clients;
    }

    public Cooperative clients(Set<Client> clients) {
        this.setClients(clients);
        return this;
    }

    public Cooperative addClient(Client client) {
        this.clients.add(client);
        client.setCooperative(this);
        return this;
    }

    public Cooperative removeClient(Client client) {
        this.clients.remove(client);
        client.setCooperative(null);
        return this;
    }

    public Set<Seller> getSellers() {
        return this.sellers;
    }

    public void setSellers(Set<Seller> sellers) {
        if (this.sellers != null) {
            this.sellers.forEach(i -> i.setCooperative(null));
        }
        if (sellers != null) {
            sellers.forEach(i -> i.setCooperative(this));
        }
        this.sellers = sellers;
    }

    public Cooperative sellers(Set<Seller> sellers) {
        this.setSellers(sellers);
        return this;
    }

    public Cooperative addSeller(Seller seller) {
        this.sellers.add(seller);
        seller.setCooperative(this);
        return this;
    }

    public Cooperative removeSeller(Seller seller) {
        this.sellers.remove(seller);
        seller.setCooperative(null);
        return this;
    }

    public Set<Courier> getCouriers() {
        return this.couriers;
    }

    public void setCouriers(Set<Courier> couriers) {
        if (this.couriers != null) {
            this.couriers.forEach(i -> i.setCooperative(null));
        }
        if (couriers != null) {
            couriers.forEach(i -> i.setCooperative(this));
        }
        this.couriers = couriers;
    }

    public Cooperative couriers(Set<Courier> couriers) {
        this.setCouriers(couriers);
        return this;
    }

    public Cooperative addCourier(Courier courier) {
        this.couriers.add(courier);
        courier.setCooperative(this);
        return this;
    }

    public Cooperative removeCourier(Courier courier) {
        this.couriers.remove(courier);
        courier.setCooperative(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Cooperative)) {
            return false;
        }
        return id != null && id.equals(((Cooperative) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Cooperative{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", address='" + getAddress() + "'" +
            ", director='" + getDirector() + "'" +
            "}";
    }
}

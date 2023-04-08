package polytech.info.gl.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;
import polytech.info.gl.domain.enumeration.VehicleType;

/**
 * A DTO for the {@link polytech.info.gl.domain.Courier} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CourierDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 3, max = 30)
    private String lastName;

    @NotNull
    @Size(min = 3, max = 30)
    private String firstName;

    @NotNull
    @Pattern(regexp = "\\b[A-Za-z0-9.]+@[A-Za-z0-9-]+\\.[A-Za-z]{2,}\\b")
    private String email;

    @NotNull
    @Pattern(regexp = "\\b[0-9]{10}\\b")
    private String phone;

    private VehicleType vehicle;

    private String status;

    private CooperativeDTO cooperative;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public VehicleType getVehicle() {
        return vehicle;
    }

    public void setVehicle(VehicleType vehicle) {
        this.vehicle = vehicle;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public CooperativeDTO getCooperative() {
        return cooperative;
    }

    public void setCooperative(CooperativeDTO cooperative) {
        this.cooperative = cooperative;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CourierDTO)) {
            return false;
        }

        CourierDTO courierDTO = (CourierDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, courierDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CourierDTO{" +
            "id=" + getId() +
            ", lastName='" + getLastName() + "'" +
            ", firstName='" + getFirstName() + "'" +
            ", email='" + getEmail() + "'" +
            ", phone='" + getPhone() + "'" +
            ", vehicle='" + getVehicle() + "'" +
            ", status='" + getStatus() + "'" +
            ", cooperative=" + getCooperative() +
            "}";
    }
}

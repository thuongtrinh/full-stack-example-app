package com.txt.rest.health.care.entity.postgres;

import com.txt.rest.health.care.dto.common.BaseDTO;
import jakarta.persistence.*;
import lombok.*;
import org.apache.commons.lang3.builder.ReflectionToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "doctor")
@Data
public class Doctor extends BaseDTO<Long> implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "doctor_id")
    private Long doctorId;

    @Column(name = "price_key")
    private String priceKey;

    @Column(name = "province_key")
    private String provinceKey;

    @Column(name = "payment_key")
    private String paymentKey;

    @Column(name = "address_clinic")
    private String addressClinic;

    @Column(name = "name_clinic")
    private String nameClinic;

    @Column(name = "note")
    private String note;

    @Column(name = "count")
    private Integer count;

    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @Column(name = "updated_date")
    private LocalDateTime updatedDate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumns({
            @JoinColumn(name = "price_key", nullable = true, insertable = false, updatable = false),
    })
    private AllCode price;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumns({
            @JoinColumn(name = "province_key", nullable = true, insertable = false, updatable = false),
    })
    private AllCode province;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumns({
            @JoinColumn(name = "payment_key", nullable = true, insertable = false, updatable = false),
    })
    private AllCode payment;

    @Override
    public String toString() {
        return ReflectionToStringBuilder.toString(this, ToStringStyle.JSON_STYLE);
    }
}

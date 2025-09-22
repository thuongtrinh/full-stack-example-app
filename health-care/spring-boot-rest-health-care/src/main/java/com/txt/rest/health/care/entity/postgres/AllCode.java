package com.txt.rest.health.care.entity.postgres;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.io.Serializable;

@Entity
@Table(name = "all_code")
@Data
public class AllCode implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "key")
    private String key;

    @Column(name = "type")
    private String type;

    @Column(name = "value_en")
    private String valueEn;

    @Column(name = "value_vi")
    private String valueVi;

//    @OneToMany(fetch = FetchType.LAZY, mappedBy = "allCode")
//    private List<Users> users;
}

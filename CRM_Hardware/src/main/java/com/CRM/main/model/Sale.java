/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.CRM.main.model;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

/**
 *
 * @author david
 */

@Entity
@Table (name = "sales")
public class Sale {
    
    // A JPA annotation.
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "id_sale")
    @Getter @Setter
    private int id;
    
    @Column(name = "date")
    @Getter @Setter
    private Date date;
    
    
    @Column(name = "product_code")
    @Getter @Setter
    private String product_code;
    
    @Column(name = "units")
    @Getter @Setter
    private int units;
    
    @Column(name = "value")
    @Getter @Setter
    private int value;
   
}

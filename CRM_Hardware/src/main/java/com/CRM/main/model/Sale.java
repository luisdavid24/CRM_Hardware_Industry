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
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "IdSale")
    @Getter @Setter
    private int id;
    
    @Column(name = "Date")
    @Getter @Setter
    private Date date;
    
    
    @Column(name = "ProductCode")
    @Getter @Setter
    private String productCode;
    
    @Column(name = "Units")
    @Getter @Setter
    private int units;
    
    @Column(name = "Value")
    @Getter @Setter
    private int value;
    
}

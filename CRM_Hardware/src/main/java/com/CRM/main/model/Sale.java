/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.CRM.main.model;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

/**
 *
 * @author david
 */

@Entity
@Table (name = "sale")
public class Sale {
    
    @Id
    @Column(name = "id")
    @Getter @Setter
    private int id;
    
    @Column(name = "date")
    @Getter @Setter
    private Date date;
    
    
    @Column(name = "productCode")
    @Getter @Setter
    private String productCode;
    
    @Column(name = "units")
    @Getter @Setter
    private int units;
    
    @Column(name = "value")
    @Getter @Setter
    private int value;
    
}

package com.CRM.main.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


/**
 *
 * @author Anderson
 */
@Entity
@Table (name = "products")
@ToString 
public class Product {
    
    
    @Id @Getter @Setter @Column(name = "productCode") 
    private String productCode;
    
    @Getter @Setter @Column(name = "name")
    private String name;
    
    @Getter @Setter @Column(name = "price")
    private int price;
    
    @Getter @Setter @Column(name = "units")
    private int units;
            
    @Getter @Setter @Column(name = "supplier")
    private String supplier;
    
}


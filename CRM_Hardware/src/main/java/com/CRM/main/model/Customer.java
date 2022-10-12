/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.CRM.main.model;
import javax.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 *
 * @author seang
 */

@Entity
@Table (name = "customers")
@ToString
public class Customer {
    
    @Id
    @Column(name = "id") @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter
    private int id;
    
    @Column(name = "name")
    @Getter @Setter
    private String name;
    

    @Column(name = "email")
    @Getter @Setter
    private String email;
    
    @Column(name = "phone")
    @Getter @Setter
    private String phone;
    
}

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.CRM.main.Models;
import javax.persistence.*;
import lombok.Getter;
import lombok.Setter;

/**
 *
 * @author seang
 */

@Entity
@Table (name = "Clientes")
public class Clientes {
    
    @Id
    @Column(name = "Id")
    @Getter @Setter
    private int Id;
    
    @Column(name = "Name")
    @Getter @Setter
    private String Name;
    

    @Column(name = "Email")
    @Getter @Setter
    private String Email;
    
    @Column(name = "Phone")
    @Getter @Setter
    private String Phone;
    
}

package com.CRM.main.model;

import javax.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table (name = "users")
@ToString
public class User {
        
    // The above code is creating a table in the database.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @Getter @Setter
    private int id;
    
    @Column(name = "name", nullable = true)
    @Getter @Setter
    private String name;
    

    @Column(name = "email", nullable = false)
    @Getter @Setter
    private String email;
    
    @Column(name = "phone", nullable = false)
    @Getter @Setter
    private String phone;
    
    @Column(name = "password", nullable = false)
    @Getter @Setter 
    private String password;
    
}

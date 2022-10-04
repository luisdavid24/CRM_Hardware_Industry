/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.CRM.main.dao;

import com.CRM.main.model.Customer;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import org.springframework.stereotype.Repository;

/**
 *
 * @author seang
 */
@Repository
@Transactional
public class customerDaoImp implements customerDao{

    @PersistenceContext
    EntityManager entityManager;
    
    @Transactional 
    public List<Customer> getCustomer(){
        String query = "FROM Customer";
        return entityManager.createQuery(query).getResultList();
    }

    @Override 
   public List<Customer> getCustomer(int id1){
       String query = "select id,name,email,phone from sales where id="+ id1;
       return entityManager.createQuery(query).getResultList();
   }
   
   @Override
   public void regCustomer(Customer customer){
       entityManager.merge(customer);
   }
}

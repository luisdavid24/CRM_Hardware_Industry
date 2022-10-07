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

     
   public Customer getCustomerOne(int id){
       return entityManager.find(Customer.class, id);
   }
   
   @Override
   public void regCustomer(Customer customer){
       Customer customerNew = new Customer();
       customerNew.setEmail(customer.getEmail());
       customerNew.setName(customer.getName());
       customerNew.setPhone(customer.getPhone());
       entityManager.merge(customer);
   }
   
   @Override
   public void modCustomer(Customer customer, int id){
       Customer temp= entityManager.find(Customer.class, id);
       temp.setName(customer.getName());
       temp.setEmail(customer.getEmail());
       temp.setPhone(customer.getPhone());
       entityManager.merge(temp);
   }
   
   @Override
   public void delete(int id){
       Customer customer = entityManager.find(Customer.class, id);
       entityManager.remove(customer);
   }
}

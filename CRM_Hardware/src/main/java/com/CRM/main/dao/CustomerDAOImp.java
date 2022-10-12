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
public class CustomerDAOImp implements CustomerDAO{

    // A way to inject the EntityManager into the DAO.
    @PersistenceContext
    EntityManager entityManager;
    
    /**
     * It returns a list of all the customers in the database
     * 
     * @return A list of customers
     */
    @Transactional 
    public List<Customer> getCustomer(){
        String query = "FROM Customer";
        return entityManager.createQuery(query).getResultList();
    }

     
   /**
    * The function takes an integer as an argument and returns a Customer object
    * 
    * @param id The id of the customer you want to retrieve.
    * @return The Customer object with the id of 1.
    */
   public Customer getCustomerOne(int id){
       return entityManager.find(Customer.class, id);
   }
   
   /**
    * This function takes a customer object and merges it with the database.
    * 
    * @param customer the object that is passed to the method
    */
   @Override
   public void regCustomer(Customer customer){
       Customer customerNew = new Customer();
       customerNew.setEmail(customer.getEmail());
       customerNew.setName(customer.getName());
       customerNew.setPhone(customer.getPhone());
       entityManager.merge(customer);
   }
   
   /**
    * It takes a customer object and an id, finds the customer with the id, sets the name, email, and
    * phone of the customer with the id to the name, email, and phone of the customer object, and then
    * merges the customer with the id with the customer object
    * 
    * @param customer the customer object that is being modified
    * @param id the id of the customer to be modified
    */
   @Override
   public void modCustomer(Customer customer, int id){
       Customer temp= entityManager.find(Customer.class, id);
       temp.setName(customer.getName());
       temp.setEmail(customer.getEmail());
       temp.setPhone(customer.getPhone());
       entityManager.merge(temp);
   }
   
   /**
    * The delete function takes in an id and finds the customer with that id and then removes it from
    * the database
    * 
    * @param id The id of the customer to be deleted.
    */
   @Override
   public void delete(int id){
       Customer customer = entityManager.find(Customer.class, id);
       entityManager.remove(customer);
   }
}

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.CRM.main.dao;

import com.CRM.main.model.Customer;
import java.util.List;
/**
 *
 * @author seang
 */
public interface CustomerDAO {
    
    /**
     * This function returns a list of customers.
     * 
     * @return A list of customers.
     */
    List<Customer> getCustomer();
    
    /**
     * This function registers a customer.
     * 
     * @param customer The customer object that you want to register.
     */
    void regCustomer(Customer customer);
    
    /**
     * ModCustomer takes a Customer object and an integer, and modifies the Customer object with the
     * given id.
     * 
     * @param customer The customer object that you want to modify.
     * @param id The id of the customer you want to modify.
     */
    void modCustomer(Customer customer, int id);
    
    /**
     * Deletes the object with the given id.
     * 
     * @param id The id of the object to be deleted.
     */
    void delete(int id);
    
    /**
     * This function returns a Customer object with the given id.
     * 
     * @param id The id of the customer you want to get.
     * @return A Customer object.
     */
    Customer getCustomerOne(int id);
}

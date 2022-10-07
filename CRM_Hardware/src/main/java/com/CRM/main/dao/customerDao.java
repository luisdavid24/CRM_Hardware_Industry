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
public interface customerDao {
    
    List<Customer> getCustomer();
    
    void regCustomer(Customer customer);
    
    void modCustomer(Customer customer, int id);
    
    void delete(int id);
    
    Customer getCustomerOne(int id);
}


package com.CRM.main.controllers;

import com.CRM.main.model.Customer;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.CRM.main.dao.CustomerDAO;
/**
 *
 * @author seang
 */

@RestController
public class CustomerController {
@Autowired
private CustomerDAO customerDAO;
    
    @RequestMapping(value = "api/customer/{id}", method = RequestMethod.GET)
    public Customer getCustomer(@PathVariable int id){
        return customerDAO.getCustomerOne(id);
    }
    @RequestMapping(value = "api/customer", method = RequestMethod.GET)
    public List<Customer> getCustomer(){
        return customerDAO.getCustomer();
    } 
    
    @RequestMapping (value = "api/customer", method = RequestMethod.POST)
    public void registerCustomer(@RequestBody Customer customer){
        customerDAO.regCustomer(customer);
    }
    
    @RequestMapping(value = "api/customer/{id}" , method = RequestMethod.PATCH)
    public void modCustomer(@RequestBody Customer customer, @PathVariable int id){
        customerDAO.modCustomer(customer, id);
    }
    
    @RequestMapping(value = "api/customer/{id}", method = RequestMethod.DELETE)
    public void deleteCustomer(@PathVariable int id){
        customerDAO.delete(id);
    }
    
}

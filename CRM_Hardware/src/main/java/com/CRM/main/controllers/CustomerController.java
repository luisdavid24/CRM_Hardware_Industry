
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
import com.CRM.main.utils.JWTUtil;
/**
 *
 * @author seang
 */

@RestController
public class CustomerController {
@Autowired
private CustomerDAO customerDAO;

@Autowired
private JWTUtil jwtUtil;
    
    /**
     * This function is used to get a customer by id
     * 
     * @param id The id of the customer you want to get.
     * @return A customer object
     */
    @RequestMapping(value = "api/customer/{id}", method = RequestMethod.GET)
    public Customer getCustomer(@PathVariable int id){
        return customerDAO.getCustomerOne(id);
    }
   /**
    * It returns a list of customers
    * 
    * @return A list of customers
    */
    @RequestMapping(value = "api/customer", method = RequestMethod.GET)
    public List<Customer> getCustomer(@RequestHeader(value = "Authorization") String token){
        if (verifyToken(token)) {
            return null;
        }
        
        return customerDAO.getCustomer();
    } 
    
    private boolean verifyToken(String token){
        return jwtUtil.getKey(token) == null;
    }
    
    /**
     * It takes a JSON object, converts it into a Customer object, and then passes it to the DAO layer
     * 
     * @param customer The object that will be passed to the method.
     */
    @RequestMapping (value = "api/customer", method = RequestMethod.POST)
    public void registerCustomer(@RequestBody Customer customer){
        customerDAO.regCustomer(customer);
    }
    
    /**
     * The function modCustomer takes in a Customer object and an id, and updates the Customer object
     * in the database with the id
     * 
     * @param customer the object that is being passed in
     * @param id the id of the customer to be modified
     */
    @RequestMapping(value = "api/customer/{id}" , method = RequestMethod.PATCH)
    public void modCustomer(@RequestBody Customer customer, @PathVariable int id){
        customerDAO.modCustomer(customer, id);
    }
    
    /**
     * This function deletes a customer from the database
     * 
     * @param id The id of the customer to be deleted.
     */
    @RequestMapping(value = "api/customer/{id}", method = RequestMethod.DELETE)
    public void deleteCustomer(@PathVariable int id){
        customerDAO.delete(id);
    }
    
}

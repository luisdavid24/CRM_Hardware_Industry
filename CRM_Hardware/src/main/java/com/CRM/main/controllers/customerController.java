
package com.CRM.main.controllers;

import com.CRM.main.model.Customer;
import com.CRM.main.dao.customerDao;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
/**
 *
 * @author seang
 */

@RestController
public class customerController {
@Autowired
private customerDao customerDAO;
    
    @RequestMapping(value = "api/customer/{id}", method = RequestMethod.GET)
    public List<Customer> getCustomer(@PathVariable int id){
        return customerDAO.getCustomer(id);
    }
    
    
}

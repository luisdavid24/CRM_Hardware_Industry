package com.CRM.main.controllers;

import com.CRM.main.model.User;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.CRM.main.dao.UserDAO;

@RestController
public class UserController {
@Autowired
    private UserDAO userDAO;
    
    @RequestMapping(value = "api/user/{id}", method = RequestMethod.GET)
    public List<User> getUser(@PathVariable int id){
        return userDAO.getUser();
    }
}

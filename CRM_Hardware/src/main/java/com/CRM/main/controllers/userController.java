package com.CRM.main.controllers;

import com.CRM.main.model.User;
import com.CRM.main.dao.UserDAO;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
/**
 *
 * @author Anderson
 */
@RestController
public class UserController {

    @Autowired
    private UserDAO userDAO;
    
    @RequestMapping(value = "/api/users", method = RequestMethod.POST)
    public void registerUser(@RequestBody User user){
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2i);
        String hash = argon2.hash(1, 1024, 1, user.getPassword());
        user.setPassword(hash);
        userDAO.registerUser(user);
    }
    
    
    
}

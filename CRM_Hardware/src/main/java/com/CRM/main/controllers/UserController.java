package com.CRM.main.controllers;

import com.CRM.main.model.User;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.CRM.main.dao.UserDAO;
import java.util.List;
/**
 *
 * @author Anderson
 */
@RestController
public class UserController {

    // Injecting the UserDAO class into the UserController class.
    @Autowired
    private UserDAO userDAO;
    
    /**
     * It returns a list of users
     * 
     * @return A list of users
     */
    @RequestMapping(value = "/api/users", method = RequestMethod.GET)
    public List<User> getUsers(){
        return userDAO.getUsers();
    }
    
    
    /**
     * It takes a user object, hashes the password, and then saves the user to the database
     * 
     * @param user the user object that is being passed in from the front end
     */
    @RequestMapping(value = "/api/users", method = RequestMethod.POST)
    public void registerUser(@RequestBody User user){
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2i);
        String hash = argon2.hash(1, 1024, 1, user.getPassword());
        user.setPassword(hash);
        userDAO.registerUser(user);
    }
    
    /**
     * It takes a string as a parameter, and returns a user object
     * 
     * @param email The email of the user you want to get.
     * @return A user object
     */
    @RequestMapping(value = "/api/user/{email}", method = RequestMethod.GET)
    public User getUserByEmail(@PathVariable String email){
        return userDAO.getUserByEmail(email);
    }
}

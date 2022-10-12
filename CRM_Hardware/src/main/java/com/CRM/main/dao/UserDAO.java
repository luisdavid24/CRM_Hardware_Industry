package com.CRM.main.dao;


import com.CRM.main.model.User;
import java.util.List;


public interface UserDAO {
    /**
     * Get a user by their credentials.
     * 
     * @param user The user object that contains the user's credentials.
     * @return A User object
     */
    User getUserByCr(User user);
    /**
     * This function registers a user.
     * 
     * @param user The user object that you want to register.
     */
    void registerUser(User user);
    /**
     * This function returns a list of users.
     * 
     * @return A list of users.
     */
    List<User> getUsers();
   /**
    * Get a user by email.
    * 
    * @param email The email address of the user you want to retrieve.
    * @return A User object
    */
    User getUserByEmail(String email);
}

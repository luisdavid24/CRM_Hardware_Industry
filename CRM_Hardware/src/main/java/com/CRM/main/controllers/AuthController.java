/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.CRM.main.controllers;

import com.CRM.main.dao.UserDAO;
import com.CRM.main.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import com.CRM.main.model.User;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Anderson
 */
@RestController
public class AuthController {
    
    
    // Injecting the UserDAO class into the AuthController class.
    @Autowired
    private UserDAO userDAO;
    
    // Injecting the JWTUtil class into the AuthController class.
    @Autowired
    private JWTUtil jwtUtil;
    
    /**
     * It takes a user object, checks if it exists in the database, and if it does, it returns a JWT
     * token
     * 
     * @param user the user object that is sent from the frontend
     * @return A JWT token
     */
    @RequestMapping(value = "/api/login")
    public String login(@RequestBody User user){
        User usLogged = userDAO.getUserByCr(user);
        //System.out.println(usLogged.getEmail());
        if(usLogged != null){
            return jwtUtil.create(String.valueOf(usLogged.getId()), usLogged.getName());
        }else{
            return "FAIL";
        }   
    }
}

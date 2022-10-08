/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.CRM.main.controllers;

import com.CRM.main.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import com.CRM.main.model.User;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import com.CRM.main.dao.UserDAO;

/**
 *
 * @author Anderson
 */
public class AuthController {
    
    
    @Autowired
    private UserDAO userDAO;
    
    @Autowired
    private JWTUtil jwtUtil;
    
    @RequestMapping(value = "/api/login")
    public String login(@RequestBody User user){
        User usLogged = userDAO.getUserByCr(user);
        
        if(usLogged != null){
            return jwtUtil.create(String.valueOf(user.getId()), usLogged.getEmail());
        }else{
            return "FAIL";
        }
    }
}

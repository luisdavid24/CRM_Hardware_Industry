/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.CRM.main.controllers;

import com.CRM.main.dao.saleDao;
import com.CRM.main.model.Sale;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
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
 * @author david
 */

@RestController
public class saleController {
    @Autowired //Hace que la clase UDAOImpl cree un objeto y lo guarda
    private saleDao saleDAO;

    /*Esto que o que
    @Autowired
    private JWTUtil jwtUtil;*/
    
    @RequestMapping(value = "api/sale/{id}", method = RequestMethod.GET)
    public List<Sale> getSale(@PathVariable int id){
        return saleDAO.getSale(id);
    }
    @RequestMapping(value = "api/sale", method = RequestMethod.GET)
    public List<Sale> getSale() {
       return saleDAO.getSale();
    }
    
    /*
    @RequestMapping(value = "sale")
    public List<Sale> listUsers(@RequestHeader(value = "Authorization") String token){

        if (verifyToken(token)){
            return null;
        }
        return userDAO.getUsers();
    }*/
    
    @RequestMapping(value = "api/sale", method = RequestMethod.POST)
    public void registerSale(@RequestBody Sale sale){ //Transforma json en un Usuario
        saleDAO.regSale(sale);
    }
    
    @RequestMapping(value = "api/sale/{id}", method = RequestMethod.DELETE)
    public void deleteUser(@PathVariable int id){
        saleDAO.delete(id);
    }
    
    
    
    
    @RequestMapping(value = "api/sale/{id}", method = RequestMethod.PUT)
    public void modUser(@RequestBody Sale sale,@PathVariable int id){ //Transforma json en un Usuario
       saleDAO.modUser(sale, id);
    }
    
    
    
}

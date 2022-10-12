/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.CRM.main.controllers;

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
import com.CRM.main.dao.SaleDAO;
import com.CRM.main.utils.JWTUtil;

/**
 *
 * @author david
 */

@RestController
public class SaleController {
    @Autowired //Hace que la clase UDAOImpl cree un objeto y lo guarda
    private SaleDAO saleDAO;
    
    @Autowired
    private JWTUtil jwtUtil;
    
    // A method that returns a list of sales.
    @RequestMapping(value = "api/sale/{id}", method = RequestMethod.GET)
    public List<Sale> getSale(@PathVariable int id){
        return saleDAO.getSale(id);
    }
    // A method that returns a list of sales.
    @RequestMapping(value = "api/sale", method = RequestMethod.GET)
    public List<Sale> getSale(@RequestHeader(value = "Authorization") String token) {
        if (verifyToken(token)) {
            return null;
        }
       return saleDAO.getSale();
    }
    
    // A method that returns a list of products codes.
    @RequestMapping(value = "/api/productsCodes", method = RequestMethod.GET)
    public List<String> getProductsCodes(){return saleDAO.getProductsCodes();};
    
    /**
     * It takes a JSON object, transforms it into a Sale object, and then saves it to the database
     * 
     * @param sale the object that is being sent to the server
     */
    @RequestMapping(value = "api/sale", method = RequestMethod.POST)
    public void registerSale(@RequestBody Sale sale){ //Transforma json en un Usuario
        saleDAO.regSale(sale);
    }
    
    /**
     * This function deletes a sale from the database
     * 
     * @param id The id of the sale you want to delete
     */
    @RequestMapping(value = "api/sale/{id}", method = RequestMethod.DELETE)
    public void deleteUser(@PathVariable int id){
        saleDAO.delete(id);
    }
    
    
    /**
     * It takes a JSON object, transforms it into a Sale object, and then updates the database with the
     * new Sale object
     * 
     * @param sale is the object that is going to be modified
     * @param id The id of the sale to be modified
     */
    @RequestMapping(value = "api/sale/{id}", method = RequestMethod.PATCH)
    public void modSale(@RequestBody Sale sale, @PathVariable int id){ //Transforma json en un Usuario
         saleDAO.modSale(sale, id);
    }
    
    private boolean verifyToken(String token){
        return jwtUtil.getKey(token) == null;
    }
}

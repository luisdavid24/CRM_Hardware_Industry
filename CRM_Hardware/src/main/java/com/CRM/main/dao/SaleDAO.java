/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.CRM.main.dao;

import com.CRM.main.model.Sale;
import java.util.List;

/**
 *
 * @author david
 */

public interface SaleDAO{
    /**
     * Get a list of sales.
     * 
     * @return A list of Sale objects.
     */
    List<Sale> getSale();

    /**
     * Deletes the object with the given id.
     * 
     * @param id The id of the object to be deleted.
     */
    void delete(int id);

    /**
     * Register a sale.
     * 
     * @param sale The sale object to be registered.
     */
    void regSale(Sale sale);

    /**
     * ModSale modifies the sale with the given id.
     * 
     * @param sale The sale object to be modified.
     * @param id The id of the sale you want to modify.
     */
    void modSale(Sale sale, int id);
    
    /**
     * This function returns a list of sales for a given id.
     * 
     * @param id The id of the sale you want to get.
     * @return A list of sales.
     */
    List<Sale> getSale(int id);
    
    /**
     * This function returns a list of product codes.
     * 
     * @return A list of strings.
     */
    List<String> getProductsCodes();
    
    
}
 
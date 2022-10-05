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

public interface saleDao{
    List<Sale> getSale();

    void delete(int id);

    void regSale(Sale sale);

   void modSale(Sale sale, int id);
    
    List<Sale> getSale(int id);
    
    
    
}
 
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.CRM.main.dao;

import com.CRM.main.model.Sale;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import org.springframework.stereotype.Repository;

/**
 *
 * @author david
 */
@Repository
@Transactional
public class SaleDAOImp implements SaleDAO{
    
    // A way to inject the EntityManager into the DAO.
    @PersistenceContext
    EntityManager entityManager;
    
    
    /**
     * It returns a list of all the sales in the database
     * 
     * @return A list of Sale objects.
     */
    @Transactional
    public List<Sale> getSale() {
        String query = "FROM Sale";
        return entityManager.createQuery(query).getResultList();
    }
   
    /**
     * It returns a list of sales from the database where the id is equal to the id1 parameter
     * 
     * @param id1 the id of the user
     * @return A list of sales.
     */
    @Override
     public List<Sale> getSale(int id1){
        String query = "select id_sale,date,product_code,units,value from sales where id =" + id1;
        return entityManager.createQuery(query).getResultList();
    }
    
     
     
    /**
     * The function deletes a sale from the database
     * 
     * @param id The id of the sale to be deleted.
     */
    @Override
    public void delete(int id) {
        Sale sale = entityManager.find(Sale.class, id);
        entityManager.remove(sale);
    }
    
/**
 * It takes a Sale object, and merges it with the database
 * 
 * @param sale The sale object to be registered.
 */

    @Override
    public void regSale(Sale sale) {
        entityManager.merge(sale);
    }
    
   

    
    /**
     * I'm trying to update a row in the database, but I'm getting an error
     * 
     * @param sale the object that contains the new values
     * @param id the id of the sale to be modified
     */
    @Override
    public void modSale(Sale sale, int id) {
        Sale temp = entityManager.find(Sale.class, id);
        temp.setDate(sale.getDate());
        temp.setProduct_code(sale.getProduct_code());
        temp.setUnits(sale.getUnits());
        temp.setValue(sale.getValue());
        entityManager.merge(temp);
    }

    /**
     * It returns a list of all the product codes in the database
     * 
     * @return A list of strings.
     */
    @Override
    public List<String> getProductsCodes() {
        String query = "SELECT productCode FROM Product";
        return entityManager.createQuery(query).getResultList();
    }
    
    
}

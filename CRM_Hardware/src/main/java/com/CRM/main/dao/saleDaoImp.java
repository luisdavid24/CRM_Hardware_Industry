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
public class saleDaoImp implements saleDao{
    
    @PersistenceContext
    EntityManager entityManager;
    
    
    @Transactional
    public List<Sale> getSale() {
        String query = "FROM Sale";
        return entityManager.createQuery(query).getResultList();
    }
   
    @Override
     public List<Sale> getSale(int id1){
        String query = "select id_sale,date,product_code,units,value from sales where id =" + id1;
        return entityManager.createQuery(query).getResultList();
    }
    
     
     
    @Override
    public void delete(int id) {
        Sale sale = entityManager.find(Sale.class, id);
        entityManager.remove(sale);
    }
    
    /*insertar nuevos objetos */
    @Override
    public void regSale(Sale sale) {
        entityManager.merge(sale);
    }
    
   

    /*Modificar*/
    @Override
    public void modSale(Sale sale, int id) {
        Sale temp = entityManager.find(Sale.class, id);
        temp.setDate(sale.getDate());
        temp.setProduct_code(sale.getProduct_code());
        temp.setUnits(sale.getUnits());
        temp.setValue(sale.getValue());
        entityManager.merge(temp);
    }
    
    
    
    
    
    
}

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
    
    
    /*@Override  me esta tirando error con esto, no se porque*/
    
    public List<Sale> getUsers() {
        String query = "select id,name, last_name ,email,password, phone from Usuario";

        return entityManager.createQuery(query).getResultList();
    }
    @Override
    public List<Sale> getSale() {
        throw new UnsupportedOperationException("Not supported yet.");
    }
    
    @Override
     public List<Sale> getSale(int id1){
        String query = "select id, name, last_name, email, password, phone from Usuario where id =" + id1;
        return entityManager.createQuery(query).getResultList();
    }
    
     
     
    @Override
    public void delete(int id) {
        Sale sale = entityManager.find(Sale.class, id);
        entityManager.remove(sale);
    }
    
    @Override
    public void regSale(Sale sale) {
        entityManager.merge(sale);
    }
    
    @Override
    public void modUser(Sale sale, int id) {
        Sale temp = entityManager.find(Sale.class, id);
        temp.setDate(temp.getDate());
        temp.setProductCode(temp.getProductCode());
        temp.setUnits(temp.getUnits());
        temp.setValue(temp.getValue());
        entityManager.merge(temp);
    }
    
    
    
}

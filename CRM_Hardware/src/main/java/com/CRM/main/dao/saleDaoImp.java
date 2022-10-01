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
    
    /* PARA QUE ES ESTO
    @Override
    public boolean verifyUser(Sale sale) {

        String query = "SELECT u FROM Usuario u WHERE u.email = :email";

       ArrayList<Sale> list = (ArrayList<Sale>) entityManager.createQuery(query)
                .setParameter("email", sale.getEmail())
                .getResultList();

        String passHashed = list.get(0).getPassword();
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2i);

        System.out.println(argon2.verify(passHashed,user.getPassword()));
        return argon2.verify(passHashed,user.getPassword());
          
    }
    */
    
    
    /* PARA QUE ES ESTO
    @Override
    public Sale getSalByCr(Sale sale) {
        String query = "SELECT u FROM Usuario u WHERE u.email = :email";

        ArrayList<Sale> list = (ArrayList<Sale>) entityManager.createQuery(query)
                .setParameter("email", user.getEmail())
                .getResultList();

        if(list.isEmpty()){
            return null;
        }

        String passHashed = list.get(0).getPassword();
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2i);

        if(argon2.verify(passHashed,user.getPassword())){
            return list.get(0);
        };

        return null;
    }
      */

    
    

    
    
}

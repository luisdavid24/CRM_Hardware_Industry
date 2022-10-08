package com.CRM.main.dao;

import com.CRM.main.model.Customer;
import com.CRM.main.model.User;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public class UserDAOImp implements UserDAO{
    
    @PersistenceContext
    EntityManager entityManager;
    
    @Transactional 
    public List<User> getUser() {
        String query = "FROM user";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public List<User> getUser(int id) {
        String query = "select id,name,email,phone,password from users where id="+ id;
       return entityManager.createQuery(query).getResultList();
    }
    
}

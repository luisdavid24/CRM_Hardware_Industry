package com.CRM.main.dao;

import com.CRM.main.model.User;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import java.util.ArrayList;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public class UserDAOImp implements UserDAO{
    
    @PersistenceContext
    EntityManager entityManager;
    
    @Override
    public User getUserByCr(User user) {
        String query = "SELECT u FROM User u WHERE u.email = :email";
        
        ArrayList<User> list = (ArrayList<User>) entityManager.createQuery(query).setParameter("email", user.getEmail()).
                getResultList();
        
        String passHashed = list.get(0).getPassword();
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2i);
        
        if(argon2.verify(passHashed, user.getPassword())){
            return list.get(0);
        }else{
            return null;
        }
    }

    @Override
    public void registerUser(User user) {entityManager.merge(user);}
    
    
    
    
    
}

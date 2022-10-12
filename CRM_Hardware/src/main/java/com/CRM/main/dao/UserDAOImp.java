package com.CRM.main.dao;

import com.CRM.main.model.User;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public class UserDAOImp implements UserDAO{
    
    // A JPA annotation that injects an EntityManager instance into the class.
    @PersistenceContext
    EntityManager entityManager;
    
    /**
     * It takes a user object, checks if the email exists in the database, if it does, it hashes the
     * password and compares it to the hashed password in the database. If it matches, it returns the
     * user object
     * 
     * @param user the user object that is passed in from the controller
     * @return The user object is being returned.
     */
    @Override
    public User getUserByCr(User user) {
        String query = "SELECT u FROM User u WHERE u.email = :email";
        
        ArrayList<User> list = (ArrayList<User>) entityManager.createQuery(query).setParameter("email", user.getEmail()).
                getResultList();
        
        if (list.isEmpty()) {
            return null;
        }
        
        String passHashed = list.get(0).getPassword();
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2i);
        
        if(argon2.verify(passHashed, user.getPassword())){
            return list.get(0);
        }
        
        return null;
    }
    

    /**
     * It registers a user.
     * 
     * @param user the user object that is being registered
     */
    @Override
    public void registerUser(User user) {entityManager.merge(user);}

    /**
     * This function returns a list of all users in the database.
     * 
     * @return A list of users.
     */
    @Override
    public List<User> getUsers() {
        String query = "SELECT u FROM User u";
        return (List<User>)entityManager.createQuery(query).getResultList();
    }

    /**
     * Get the user by email
     * 
     * @param email test@test.com
     * @return A list of users.
     */
    @Override
    public User getUserByEmail(String email) {
        String query = "SELECT u FROM User u";
        List<User> list = (List<User>)entityManager.createQuery(query).getResultList();
        return list.get(0);
    }
}

package com.CRM.main.dao;


import com.CRM.main.model.User;
import java.util.List;


public interface UserDAO {
    User getUserByCr(User user);
    void registerUser(User user);
    List<User> getUsers();
    User getUserByEmail(String email);
}

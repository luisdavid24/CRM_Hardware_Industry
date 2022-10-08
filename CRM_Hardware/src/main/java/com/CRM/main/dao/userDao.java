package com.CRM.main.dao;


import com.CRM.main.model.User;


public interface UserDAO {
    User getUserByCr(User user);
    void registerUser(User user);
}

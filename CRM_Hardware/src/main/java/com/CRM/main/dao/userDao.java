package com.CRM.main.dao;


import com.CRM.main.model.User;


public interface userDao {
    User getUserByCr(User user);
    void registerUser(User user);
}

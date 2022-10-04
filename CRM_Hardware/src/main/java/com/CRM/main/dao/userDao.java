package com.CRM.main.dao;

import com.CRM.main.model.Customer;
import com.CRM.main.model.User;
import java.util.List;

public interface userDao {
    List<User> getUser();
    
    List<User> getUser(int id);
    
}

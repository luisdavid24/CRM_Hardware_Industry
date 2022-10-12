package com.CRM.main.dao;

import com.CRM.main.model.Product;
import java.util.List;

/**
 *
 * @author Anderson
 */
public interface ProductDAO {
    void deleteProduct(String productCode);
    void insertProduct(Product product);
    void modifyProduct(Product product, String productCode);
    List<Product> getProducts();
    Product getProduct(String productCode);
    List<Integer> getNumbOfProducts();
    String getPopularProduct();
}

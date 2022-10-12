package com.CRM.main.dao;

import com.CRM.main.model.Product;
import java.util.List;

/**
 *
 * @author Anderson
 */
public interface ProductDAO {
    /**
     * Delete a product from the database.
     * 
     * @param productCode The product code of the product to be deleted.
     */
    /**
     * Delete a product from the database.
     * 
     * @param productCode The product code of the product to be deleted.
     */
    void deleteProduct(String productCode);
    /**
     * Inserts a product into the database.
     * 
     * @param product The product object to be inserted.
     */
    void insertProduct(Product product);
    /**
     * Modify the product with the given product code.
     * 
     * @param product The product object that you want to modify.
     * @param productCode The product code of the product to be modified.
     */
    void modifyProduct(Product product, String productCode);
    /**
     * This function returns a list of products.
     * 
     * @return A list of products.
     */
    List<Product> getProducts();
    /**
     * Given a product code, return the product.
     * 
     * @param productCode The product code of the product to retrieve.
     * @return A Product object
     */
    Product getProduct(String productCode);
    /**
     * This function returns a list of integers that represent the number of products in each category.
     * 
     * @return An ArrayList of Integers.
     */
    List<Integer> getNumbOfProducts();
    /**
     * Get the most popular product.
     * 
     * @return A string
     */
    String getPopularProduct();
}

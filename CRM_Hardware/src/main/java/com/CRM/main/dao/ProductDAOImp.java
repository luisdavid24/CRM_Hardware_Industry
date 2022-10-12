package com.CRM.main.dao;

import com.CRM.main.model.Product;
import java.util.List;
import java.util.Random;
import javax.persistence.*;
import javax.transaction.Transactional;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Anderson
 */
@Repository
@Transactional
public class ProductDAOImp implements ProductDAO{
    
    // Creating an instance of the EntityManager class.
    @PersistenceContext
    EntityManager entityManager;
    
    

    /**
     * It deletes a product from the database.
     * 
     * @param productCode The product code of the product to be deleted.
     */
    @Override
    public void deleteProduct(String productCode) {
        Product product = entityManager.find(Product.class, productCode);
        entityManager.remove(product);
    }

    /**
     * // Java
     * @Override
     *     public void insertProduct(Product product) {entityManager.merge(product);}
     * 
     * @param product the product object that is to be inserted into the database
     */
    @Override
    public void insertProduct(Product product) {entityManager.merge(product);}

    /**
     * I'm trying to update the product with the productCode that is passed in, but I'm getting a null
     * pointer exception
     * 
     * @param product the product object that is being modified
     * @param productCode String
     */
    @Override
    public void modifyProduct(Product product, String productCode) {
        Product pTemp = entityManager.find(Product.class, productCode);
        pTemp.setPrice(product.getPrice());
        pTemp.setUnits(product.getUnits());
        pTemp.setSupplier(product.getSupplier());
        pTemp.setImgURL(product.getImgURL());
        entityManager.merge(pTemp);
    }

    /**
     * This function returns a list of all products in the database.
     * 
     * @return A list of products.
     */
    @Override
    public List<Product> getProducts() {
        String query = "select p from Product p";
        return entityManager.createQuery(query).getResultList();
    }

    /**
     * This function returns a product object from the database, given a product code.
     * 
     * @param productCode The product code of the product to be retrieved.
     * @return The product object with the given product code.
     */
    @Override
    public Product getProduct(String productCode) {
        return entityManager.find(Product.class, productCode);
    }

    /**
     * It returns a list of integers that are the number of units of each product
     * 
     * @return A list of integers.
     */
    @Override
    public List<Integer> getNumbOfProducts() {
        String query = "SELECT p.units FROM Product p";
        return entityManager.createQuery(query).getResultList();
    }
    
    /**
     * It returns a random product name from the database
     * 
     * @return A random product name from the database.
     */
    @Override
    public String getPopularProduct(){
        String query = "SELECT p.name FROM Product p ORDER BY RAND()";
        Random rnd = new Random();
        int size = entityManager.createQuery(query).getResultList().size();
        return (String)entityManager.createQuery(query).getResultList().get(rnd.nextInt(size));
    }


    
}

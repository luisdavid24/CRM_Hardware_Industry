package com.CRM.main.controllers;

import com.CRM.main.dao.ProductDAO;
import com.CRM.main.model.Product;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author Anderson
 */
@RestController
public class ProductController {
    
    // Injecting the ProductDAO class into the ProductController class.
    @Autowired
    private ProductDAO productDAO;
    
    /**
     * The function is called getProducts() and it returns a list of products
     * 
     * @return A list of products
     */
    @RequestMapping(value = "/api/products", method = RequestMethod.GET)
    public List<Product> getProducts(){return productDAO.getProducts();}
    
    /**
     * The function is called insertProduct, it takes a Product object as a parameter, and it calls the
     * insertProduct function in the ProductDAO class
     * 
     * @param product The object that will be inserted into the database.
     */
    @RequestMapping(value = "/api/products", method = RequestMethod.POST)
    public void insertProduct(@RequestBody Product product){productDAO.insertProduct(product);}
    
    /**
     * This function will modify the product with the productCode that is passed in the URL, with the
     * product that is passed in the body of the request.
     * 
     * @param product The product object that is being passed in.
     * @param productCode The product code of the product to be modified.
     */
    @RequestMapping(value = "/api/product/{productCode}", method = RequestMethod.PATCH)
    public void modifyProduct(@RequestBody Product product, @PathVariable String productCode){productDAO.modifyProduct(product, productCode);}
    
    /**
     * // Java
     * This is a function that will delete a product from the database.
     * 
     * @param productCode This is the product code of the product that we want to delete.
     */
    @RequestMapping(value = "/api/product/{productCode}", method = RequestMethod.DELETE)
    public void deleteProduct(@PathVariable String productCode){productDAO.deleteProduct(productCode);}
    
    /**
     * // Java
     * Returning a product object.
     * 
     * @param productCode This is the path variable that will be used to identify the product.
     * @return A product object
     */
    @RequestMapping(value = "/api/product/{productCode}", method = RequestMethod.GET)
    public Product getProduct(@PathVariable String productCode){return productDAO.getProduct(productCode);}
    
    /**
     * It returns a list of integers that represent the number of products in each category
     * 
     * @return List of Integers
     */
    @RequestMapping(value = "/api/numbOfProducts", method = RequestMethod.GET)
    public List<Integer> getNumbOfProducts(){return productDAO.getNumbOfProducts();}
    
    /**
     * It returns a string of the most popular product in the database
     * 
     * @return A string
     */
    @RequestMapping(value = "/api/popularProduct", method = RequestMethod.GET)
    public String getPopularProduct(){return productDAO.getPopularProduct();}
    
}

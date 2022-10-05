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
    
    @Autowired
    private ProductDAO productDAO;
    
    @RequestMapping(value = "/api/products", method = RequestMethod.GET)
    public List<Product> getProducts(){return productDAO.getProducts();}
    
    @RequestMapping(value = "/api/products", method = RequestMethod.POST)
    public void insertProduct(@RequestBody Product product){productDAO.insertProduct(product);}
    
    @RequestMapping(value = "/api/product/{productCode}", method = RequestMethod.PATCH)
    public void modifyProduct(@RequestBody Product product, @PathVariable String productCode){productDAO.modifyProduct(product, productCode);}
    
    @RequestMapping(value = "/api/product/{productCode}", method = RequestMethod.DELETE)
    public void deleteProduct(@PathVariable String productCode){productDAO.deleteProduct(productCode);}
    
    @RequestMapping(value = "/api/product/{productCode}", method = RequestMethod.GET)
    public Product getProduct(@PathVariable String productCode){return productDAO.getProduct(productCode);}
    
}

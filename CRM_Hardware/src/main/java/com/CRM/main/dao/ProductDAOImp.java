package com.CRM.main.dao;

import com.CRM.main.model.Product;
import java.util.List;
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
    
    @PersistenceContext
    EntityManager entityManager;
    
    

    @Override
    public void deleteProduct(String productCode) {
        Product product = entityManager.find(Product.class, productCode);
        entityManager.remove(product);
    }

    @Override
    public void insertProduct(Product product) {entityManager.merge(product);}

    @Override
    public void modifyProduct(Product product, String productCode) {
        Product pTemp = entityManager.find(Product.class, productCode);
        pTemp.setPrice(product.getPrice());
        pTemp.setUnits(product.getUnits());
        pTemp.setSupplier(product.getSupplier());
        entityManager.merge(pTemp);
    }

    @Override
    public List<Product> getProducts() {
        String query = "select p from Product p";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public Product getProduct(String productCode) {
        return entityManager.find(Product.class, productCode);
    }


    
}

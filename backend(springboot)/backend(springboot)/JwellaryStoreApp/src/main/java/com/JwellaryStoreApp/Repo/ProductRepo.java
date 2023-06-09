package com.JwellaryStoreApp.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.JwellaryStoreApp.POJO.Products;

@Repository
public interface ProductRepo extends JpaRepository<Products, Long> {
	@Query("Select pro FROM Products pro WHERE pro.category_id=:cat_id")
	List<Products> getByCategoryId(@Param("cat_id")String cat_id);

	Products getProductsById(String productId);
}

package com.JwellaryStoreApp.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.JwellaryStoreApp.POJO.Category;

public interface CategoryRepo  extends JpaRepository<Category, Long> {

}

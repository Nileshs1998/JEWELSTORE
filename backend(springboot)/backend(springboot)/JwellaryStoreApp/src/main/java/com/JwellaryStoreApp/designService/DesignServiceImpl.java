package com.JwellaryStoreApp.designService;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.JwellaryStoreApp.POJO.CheckoutCart;
import com.JwellaryStoreApp.POJO.Design;
import com.JwellaryStoreApp.Repo.CheckoutRepo;
import com.JwellaryStoreApp.Repo.DesignRepo;
import com.JwellaryStoreApp.Service.CartService.CartService;

@Service
public class DesignServiceImpl implements DesignService{
	


	@Autowired
	DesignRepo designRepo;
	
	 @Autowired
	    private FileStorageService fileStorageService;
	
	 @Autowired
		CartService cartService;
	 
	 @Autowired
	 CheckoutRepo checkoutRepo;



	@Override
	public boolean newdesignupload(MultipartFile file, Design design) 
	{
		
		String filename=fileStorageService.storeFile(file);
		design.setFilename(filename);
		design.setStatus(0);
		design.setPrice(0);
			String orderId = ""+getOrderId();
			CheckoutCart cart = new CheckoutCart();
			cart.setPayment_type("COD");
			cart.setPrice(0);
			cart.setUser_id(design.getUser_id());
			cart.setOrder_id(orderId);
			cart.setProduct(null);
			cart.setQty(design.getQty());
			cart.setDelivery_address("deliveryAddress");
			checkoutRepo.save(cart);
			if(designRepo.save(design)!=null)
			{
				return true;
			}
			else {
				return false;
			}
		
		
		// TODO Auto-generated method stub
		
	}
	
	public int getOrderId() {
	    Random r = new Random( System.currentTimeMillis() );
	    return 10000 + r.nextInt(20000);
	}

}

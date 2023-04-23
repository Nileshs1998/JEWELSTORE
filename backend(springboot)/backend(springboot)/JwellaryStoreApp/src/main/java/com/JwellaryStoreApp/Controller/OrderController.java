package com.JwellaryStoreApp.Controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.JwellaryStoreApp.JWTConfiguration.ShoppingConfiguration;
import com.JwellaryStoreApp.POJO.AddtoCart;
import com.JwellaryStoreApp.POJO.ApiResponse;
import com.JwellaryStoreApp.POJO.CheckoutCart;
import com.JwellaryStoreApp.POJO.Design;
import com.JwellaryStoreApp.Service.CartService.CartService;
import com.JwellaryStoreApp.Service.ProductService.ProductServices;
import com.JwellaryStoreApp.designService.DesignService;


@RestController
@RequestMapping("api/order")
public class OrderController {
	@Autowired
	CartService cartService;
	
	@Autowired
	DesignService designService;
	
	ProductServices proService;
	@RequestMapping("checkout_order")
  	public ResponseEntity<?> checkout_order(@RequestBody HashMap<String,String> addCartRequest) {
		try {
			String keys[] = {"userId","total_price","pay_type","deliveryAddress"};
			if(ShoppingConfiguration.validationWithHashMap(keys, addCartRequest)) {
				
				
			}
			long user_Id = Long.parseLong(addCartRequest.get("userId"));
			double total_amt = Double.parseDouble(addCartRequest.get("total_price"));
			if(cartService.checkTotalAmountAgainstCart(total_amt,user_Id)) {
				List<AddtoCart> cartItems = cartService.getCartByUserId(user_Id);
				List<CheckoutCart> tmp = new ArrayList<CheckoutCart>();
				for(AddtoCart addCart : cartItems) {
					String orderId = ""+getOrderId();
					CheckoutCart cart = new CheckoutCart();
					cart.setPayment_type(addCartRequest.get("pay_type"));
					cart.setPrice(total_amt);
					cart.setUser_id(user_Id);
					cart.setOrder_id(orderId);
					cart.setProduct(addCart.getProduct());
					cart.setQty(addCart.getQty());
					cart.setDelivery_address(addCartRequest.get("deliveryAddress"));
					tmp.add(cart);
				}
				cartService.saveProductsForCheckout(tmp);
				return ResponseEntity.ok(new ApiResponse("Order placed successfully", ""));
			}else {
				throw new Exception("Total amount is mismatch");
			}
		}catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body(new ApiResponse(e.getMessage(), ""));
		}
	}
	public int getOrderId() {
	    Random r = new Random( System.currentTimeMillis() );
	    return 10000 + r.nextInt(20000);
	}
	@RequestMapping("getOrdersByUserId")
		public ResponseEntity<?> getOrdersByUserId(@RequestBody HashMap<String,String> ordersRequest) {
		try {
			String keys[] = {"userId"};	
			return ResponseEntity.ok(new ApiResponse("Order placed successfully", ""));
		}catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body(new ApiResponse(e.getMessage(), ""));
		}
		
	}
	
	@PostMapping(value="uploaddesing",consumes= MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<?> uploadDesignFile(@RequestParam MultipartFile file,
			@RequestParam String gp,
			@RequestParam String gc,
			@RequestParam String dc,
			@RequestParam Long user_id,
			@RequestParam int qty,
			@RequestParam String type) 
	{
		try {
			System.out.println(String.format("File name '%s' uploaded successfully.", file.getOriginalFilename()));
			 Design design=new Design();
			 design.setGold_color(gc);
			 
			 design.setGold_purity(gp);
			 design.setDiamond_clarity(dc);
			 design.setFilename(file.getOriginalFilename());
			 design.setQty(qty);
			 design.setUser_id(user_id);
			 design.setType(type);
			 boolean success=designService.newdesignupload(file,design);
			 if(success)
			 {
				 return ResponseEntity.ok(new ApiResponse("Order placed successfully", ""));
					 
			 }
			 else
			 {
				 return ResponseEntity.ok(new ApiResponse("Order Not placed ", ""));
					
			 }
		
		}catch(Exception e) {
		e.printStackTrace();
		return ResponseEntity.badRequest().body(new ApiResponse(e.getMessage(), ""));
	}
		
	}
	
}

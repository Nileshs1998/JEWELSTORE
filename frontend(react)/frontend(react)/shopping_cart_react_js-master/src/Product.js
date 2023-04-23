
import { useEffect, useState } from 'react';
import './App.css';
import Menu from './Menu';
import {httpPost,httpPostwithToken} from './HttpConfig';
import {CartContextValue} from './ContextProvider';
import { useParams } from 'react-router-dom';
import _ from "lodash";

export default function Product()
 {
	const [cartData,dispatch] = CartContextValue()
	let params = useParams();
	const [categoryList,setCategoryList] = useState([]);
	const [product,setproductdetails]=useState('')
	const isloggedin=localStorage.getItem("token");
	useEffect(()=>{
		//TODO check user login
		if(isloggedin)
		{
			getCartApi();
		}
		getproductdetails();
		
	},[])

	const addCartApi=(productObj)=>{

		if(isloggedin){
			console.log(obj);
		httpPostwithToken("addtocart/addProduct",obj)
		.then((res)=>{		
			res.json() .then(data=>{
				if(res.ok){
					dispatch({
						"type":"add_cart",
						"data":data
					})
					alert("Successfully added..")
				}else{
					alert(data.message)
				}
			})     
		}).catch(function(res){
			console.log("Error ",res);
			//alert(error.message);
		}
		)

		}
		else{
			alert("Please Login to Continue")
		}

		let obj = {
			"productId":productObj.id,			
			"qty":"1",
			"price":productObj.price
			
		}

		
	}

	const getCartApi = ()=>{		
		httpPostwithToken("addtocart/getCartsByUserId",{})
		.then((res)=>{				
			res.json() .then(data=>{
				if(res.ok){
					dispatch({
						"type":"add_cart",
						"data":data
					})
					//alert("Successfully added..")
				}else{
					alert(data.message)
				}
			})
		},error=>{
			alert(error.message);
		}
		)
	}

	const getproductdetails = ()=>{		

		let obj = {
			"product_id":params.id,			
			
		}

		httpPostwithToken("product/getProductById",obj)
		.then((res)=>{
			res.json().then(response=>{
				if(res.ok)
				{
					setproductdetails(response)
					console.log(product);
				}
					else{
						alert("No product found..");	
					}
				
			})
		},error=>{
			alert(error.message);
		}
		)

	}
    return (
        <div class="single">
		<div class="container">
			<div class="col-md-6 single-left">
				<div class="flexslider">
					<ul class="slides">
						<li data-thumb="../assets/images/2.jpg">
							<div class="thumb-image"> <img src={("../assets/images/product"+product.id+".png")} data-imagezoom="true" class="img-responsive" alt=""/> </div>
						</li>
						
					</ul>
					<div>
					<div class="prodescription">
					<h5><i>Product Specifications</i></h5>
					<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
						</p>
				</div>
						<table className='styled-table2'>
							<thead >
							<tr>
          <th >Sr.No</th>
          <th>product Specification</th>
		  <th>Decription</th>
		  
        </tr>
							</thead>
							<tbody>
							<tr>
          <th>Sr.No</th>
          <th>product Name</th>
		  <th>Quantity</th>
		  
        </tr>
		<tr>
          <th>Sr.No</th>
          <th>product Name</th>
		  <th>Quantity</th>
		  
        </tr>
		<tr>
          <th>Sr.No</th>
          <th>product Name</th>
		  <th>Quantity</th>
		  
        </tr>
							</tbody>
						</table>
					</div>
					
                    </div>
                    </div>
               

        <div class="col-md-6 single-right">
				<h3>{product.name}</h3>
				
				<div class="rating1">

					<span class="starRating">
						
						
						<input id="rating5" type="radio" name="rating" value="5"/>
						<label for="rating5">5</label>
						<input id="rating4" type="radio" name="rating" value="4"/>
						<label for="rating4">4</label>
						<input id="rating3" type="radio" name="rating" value="3" checked/>
						<label for="rating3">3</label>
						<input id="rating2" type="radio" name="rating" value="2"/>
						<label for="rating2">2</label>
						<input id="rating1" type="radio" name="rating" value="1"/>
						<label for="rating1">1</label>
					</span>
				</div>
				<div class="description">
					<h5><i>Description</i></h5>
					<p>{product.desc}</p>
				</div>
			
				
				<div class="simpleCart_shelfItem">
					<p>{product.price}</p>
				
						<button onClick={()=>addCartApi(product)} href="javascript:void(0)" type="submit" class="w3ls-cart">Add to cart</button>
						
				
				</div> 
			</div>
           
                </div>
                </div>
    )
}
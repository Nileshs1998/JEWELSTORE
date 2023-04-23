import { useEffect, useState } from 'react';
import React from 'react'
import './App.css';
import Menu from './Menu';
import {httpPost,httpPostwithToken} from './HttpConfig';
import { Link, Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {CartContextValue} from './ContextProvider';
export default function Category() {

    const [cartData,dispatch] = CartContextValue()
    let params = useParams();
	const[productno,setprono] = useState('');
    const [productList,setProductList] = useState([]);
	const isloggedin=localStorage.getItem("token");
    useEffect(()=>{
		//TODO check user login
		getProductsByCategory();
		if(isloggedin)
		{getCartApi();}
	},[])

	const addCartApi=(productObj)=>{

		let obj = {
			"productId":productObj.id,			
			"qty":"1",
			"price":productObj.price
			
		}

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


    const getProductsByCategory = (cat_id)=>{
		let obj = {
			"cat_id":params.id
		}
		
		httpPostwithToken("product/getProductsByCategory",obj)
		.then((res)=>{
			res.json().then(response=>{
				if(res.ok){
					if(response.length > 0){
						setProductList(response)
					}else{
						
						alert("No product found..");
						window.location.href = '/';	
					}
				}else{
					setProductList([])
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
            <div className=' col md-12 categoryheader'>
                <h5>Explore All Products in  
					
						{(() => {
							switch (params.id) {
							  case '1':
								return " GOLD "
							  case '2':
								return " SILVER "
								case '3':
									return " DIAMOND "
							 
							  
							}
						  })()}
						

					
					
					 Range</h5>
                <p>We have a widerange of products in gold Varieirty</p>
            </div>
            <div className='catproduct'>
            {
					productList.map((product)=>(
						<div className='col-md-3 info'>
                    <img src={("../assets/images/product"+product.id+".png")} alt="" className="img-responsive" key={1} />
                    <h5>{product.name}</h5>
                        <div class="rating3 ">
                            <span class="starRating">
                                <input id="rating5" type="radio" name="rating1" value="5"/>
                                <label for="rating5">5</label>
                                <input id="rating4" type="radio" name="rating1" value="4"/>
                                <label for="rating4">4</label>
                                <input id="rating3" type="radio" name="rating1" value="3" checked/>
                                <label for="rating3">3</label>
                                <input id="rating2" type="radio" name="rating1" value="2"/>
                                <label for="rating2">2</label>
                                <input id="rating1" type="radio" name="rating1" value="1"/>
                                <label for="rating1">1</label>
                            </span>
                            <span className='price ml'>{product.price}. Rs</span>
                        </div>
                           		
                                    <div><p>{product.desc}</p> 	</div>
                           		<div className='button'>
									<button onClick={()=>addCartApi(product)} href="javascript:void(0)" className='add'>Add to Cart</button>
									<Link to={"/product/"+product.id}><button className='view'>View Info</button>
									</Link></div>							
               		 </div>


					))
				}
                
                {/* <div className='col-md-3 info'>
                    <img src={("../assets/images/product1.png")} alt="" className="img-responsive" key={1} />
                        <div class="rating2 ">
                            <span class="starRating">
                                <input id="rating5" type="radio" name="4" value="5"/>
                                <label for="rating5">5</label>
                                <input id="rating4" type="radio" name="rating4" value="4"/>
                                <label for="rating4">4</label>
                                <input id="rating3" type="radio" name="rating4" value="3" checked/>
                                <label for="rating3">3</label>
                                <input id="rating2" type="radio" name="rating4" value="2"/>
                                <label for="rating2">2</label>
                                <input id="rating1" type="radio" name="rating4" value="1"/>
                                <label for="rating1">1</label>
                            </span>
                            <span className='price'>Rs 2000</span>
                        </div>
                            <h5>Product Name</h5>
                            <div><p>Discription</p> 	</div>
                                <div className='button'>
                                <button className='add'>Add to Cart</button>
                                <button className='view'>View Info</button>
                            </div>							
                </div> */}
                
            </div>
        </div>
</div>   
  )
}


import { useEffect, useState } from 'react';
import './App.css';
import Menu from './Menu';
import {httpPost,httpPostwithToken,formdatahttpPostwithToken} from './HttpConfig';
import {CartContextValue} from './ContextProvider';
import { Link } from 'react-router-dom';
function Home() {

	const[goldColor,setgoldColor] = useState('');
	const[goldPuri,setgoldPuri] = useState('');
    const[diamondPuri,setdiamondPuri] = useState('');
    const[quantity,setquanity] = useState('');
	const[type,settype] = useState('');
	const[filename,setfilename]=useState(null);
	const [categoryList,setCategoryList] = useState([]);
	const [productList,setProductList] = useState([]);
	const [cartData,dispatch] = CartContextValue()
	const userid=localStorage.getItem("user_id");
	const isloggedin=localStorage.getItem("token");
	useEffect(()=>{
		//TODO check user login
		getCategory();
		if(isloggedin)
		{
			getCartApi();
		}
		
	},[])


	

   

	const submitdesing=()=>{

		if(!isloggedin)
		{
			alert("Please Log In To Continue");
			return;
		}
		if(filename == "" || filename==null){
			alert("Please Select File To Upload");
			return;
		}else if(goldColor == ""){
			alert("Name COLOR  not be empty");
			return;
		}else if(goldPuri == ""){
			alert("PURITY should not be empty");
			return;
		}else if(diamondPuri == ""){
			alert("Diamond should not be empty");
			return;
		}else if(type == "")
		{
			alert("Type should not be empty");
			return;
		}
		else if(quantity == "")
		{
			alert("Repassword should not be empty");
			return;
		}
		


		var FORMdata = new FormData();
		     var imagedata = filename;

			 FORMdata.append("file",filename);	
			 FORMdata.append("gc",goldColor);
			 FORMdata.append("gp",goldPuri);
			 FORMdata.append("dc",diamondPuri);
			 FORMdata.append("type",type);
			 FORMdata.append("qty",quantity);
			 FORMdata.append("user_id",userid);
			 
			 formdatahttpPostwithToken("order/uploaddesing",FORMdata)
			 .then((res)=>{				
				res.json() .then(data=>{
					if(res.ok){
						
						alert("Successfully added..")
					}else{
						alert(data.message)
					}
				})
			},error=>{
				alert(error.message);
			})
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
	const addCartApi=(productObj)=>{

		if(isloggedin)
		{
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
		else{
			alert("Please Login to Continue");
		}

		
	}
	const getCategory = ()=>{
		httpPost("product/getAllCategory",{}).
		then((res)=>{
			res.json().then(response=>{
				if(res.ok){
					setCategoryList(response);
					getProductsByCategory(response[0].id);
				}else{
					alert("Error in category api..")
				}
			})
			
			
		})
	}

	
	const getProductsByCategory = (cat_id)=>{
		let obj = {
			"cat_id":cat_id
		}
		
		httpPostwithToken("product/getProductsByCategory",obj)
		.then((res)=>{
			res.json().then(response=>{
				if(res.ok){
					if(response.length > 0){
						setProductList(response)
					}else{
						
						alert("No product found..");
						setProductList([])
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
	// const addCart=(productObj)=>{
	// 	//TODO Add cart implementation..
	// 	console.log(productObj)
	// }
	// const loginApi = ()=>{
	// 	if(mobile == ""){
	// 		alert("Mobile should not be empty");
	// 		return;
	// 	}else if(password == ""){
	// 		alert("password should not be empty");
	// 		return;
	// 	}
	// 	let jsonOBj = {"mobile":mobile,"password":password }
		
	// 	httpPost("login/user",jsonOBj)
	// 	.then(res => res.json())
	// 	.then((res)=>{
	// 		if(res['token'] != null){
	// 			localStorage.setItem("token",res['token']);//token
	// 			localStorage.setItem("user_id",res['user_profile_details']['user_id']);//user_id
	// 			setsignin_up_model('')//hide the sign up model.
	// 			getCategory();
	// 		}else{
	// 			alert(res['message']);	
	// 		}
			
	// 		//console.log(res);
			
	// 	},error=>{
	// 		alert(error.message);
	// 	}
	// 	)
	// }
  return (
    <div>
   	

  <div className="banner">
		<div className="container">
			<h3>Jewellary Store, <span>Special Offers</span></h3>
		</div>
	</div>

	<div className="banner-bottom">
		<div className="container">
			<div className="col-md-4 wthree_banner_bottom_left">
				<div className="video-img">
					<a className="play-icon popup-with-zoom-anim" href="#small-dialog">
						<span className="glyphicon glyphicon-expand" aria-hidden="true"></span>
					</a>
				</div> 
			</div>
      <div className="col-md-8 wthree_banner_bottom_right">
				<div className="bs-example bs-example-tabs" role="tabpanel" data-example-id="togglable-tabs">
					<ul id="myTab" className="nav nav-tabs" role="tablist">
					
					

						{
							categoryList.map((category)=>(
								<li  onClick={(e)=>getProductsByCategory(category.id)} key={category.id} role="presentation">
									<a href="javascript:void(0)">{category.name}</a>
					</li>
								
							))
						}
						
						
					</ul>
					<div id="myTabContent" className="tab-content">
						<div role="tabpanel" className="tab-pane fade active in" id="home" aria-labelledby="home-tab">
						<div class="single1">
		
            
            <div className='catproducthome'>

				{
					productList.map((product)=>(
						<div className='col-md-4 info'>
                    <img src={("../assets/images/product"+product.id+".png")} alt="" className="img-responsive" key={1} />
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
                            <span className='price'>{product.price}</span>
                        </div>
                           		 <h5>{product.name}</h5>
                           		<div className='button'>
									<button onClick={()=>addCartApi(product)} href="javascript:void(0)" className='add'>Add to Cart</button>
									<Link to={"/product/"+product.id}><button className='view'>View Info</button>
									</Link></div>							
               		 </div>


					))
				}
                
                
				
				
								
								{
									// productList.map((product)=>(

									// 	<div className="col-md-4 agile_ecommerce_tab_left">
									// 		<div className="hs-wrapper">
									// 			<img src={("../assets/images/product"+product.id+".png")} alt="" className="img-responsive" key={product.id} />
									// 			<div className="w3_hs_bottom">
									// 				<ul>
									// 					<li>
									// 						<a href="#" data-toggle="modal" data-target="#myModal">
									// 							<span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span></a>
									// 					</li>
									// 				</ul>
									// 			</div>
									// 		</div> 
									// 		<h5>
									// 		<Link to={"/product/"+product.id}>{product.name}</Link>

																						
									// 		</h5>
									// 		<h5><a onClick={()=>addCartApi(product)} href="javascript:void(0)">Add Cart</a></h5>
									// 		<div className="simpleCart_shelfItem1">
									// 			<p><i className="item_price">Rs.{product.price}</i></p>
									// 		</div>
									// 	</div>
									// ))
								}
								
								
								<div className="clearfix"> </div>
							</div>
						</div>
						</div>
						</div>
						</div>
						</div>
						</div>
						

	<div id="customedes" className="newsletter">
		<div className='w3agile_newsletter_left'>
			<h3>Customize Your Design</h3>
			<p>Get Your Design build just what you like.</p>
			<div className='container'>
			<div className='col-md-3 cusdesign'>
					<div className="cart cart cusbox_1"> 
						<button className="numberbag"  value="">
							<i className="" aria-hidden="true">1</i>
							<span className="cart_countarrow">-------</span>
						</button>
						<p className='cuslabel'>Upload Your Design</p> 
					<p className='info'>Got an idea of customizing your jwellary, Upload a reference with us to start customizing </p> 

					</div> 
					 
					
				</div>

				<div className='col-md-3 cusdesign'>
					<div className="cart cart cusbox_1"> 
						<button className="numberbag" type="submit" name="submit" value="">
							<i className="" aria-hidden="true">2</i>
							<span className="cart_countarrow">-------</span>
							
						</button>
						<p className='cuslabel'>Select Customization</p> 
					<p className='info'>Choose Customization Options and set the opions for design </p> 

					</div> 
					 
					
				</div>

				<div className='col-md-3 cusdesign'>
					<div className="cart cart cusbox_1"> 
						<button className="numberbag" type="submit" name="submit" value="">
							<i className="" aria-hidden="true">3</i>
							<span className="cart_countarrow">-------</span>
						</button>
						<p className='cuslabel'>Select Size and Quanity</p> 
					<p className='info'>select the final size and quantity of your design, </p> 

					</div> 
					 
					
				</div>
				<div className='col-md-3 cusdesign'>
					<div className="cart cart cusbox_1"> 
						<button className="numberbag" type="submit" name="submit" value="">
							<i className="" aria-hidden="true">4</i>
							<span className="cart_countarrow">-------</span>
						</button>
						<p className='cuslabel'>Submit Your Details</p> 
					<p className='info'>select payment options and get your design deliver to you  </p> 

					</div> 
					 
					
				</div>			
			</div>
			 
				<div className='container cusform'>
						<div className='col-md-4 leftside'>
						<p className='title'>Best Design Available</p> 
					<p className='info'>Check out from the list of options Available</p>
					<ol className='listoptions'>
						<li>Diamond</li>
						<ul><li>Nested List Item</li></ul>
							<li>Gold
								<ul>
									<li>Nested List Item</li>
									
									<li>Nested List Item</li>
								</ul>
							</li>
							<li>Silver</li>
							<ul>	<li>Nested List Item</li></ul>
						</ol>
					
						</div>
						<div className='col-md-8 rightside'>
						
					<p className='title'>Get Your Design Now</p> 
					<p className='info'>Fill Out the Above Details to gets your desing Now</p> 

						<div className='designform'>
						<form action="#" method="post">
							
							<div className='col-md-6 formrow'>
								<p className='inptlabel'>Gold Colour* </p>
									<select name="goldpuri" onChange={(e)=>setgoldColor(e.target.value)} className='inputtext'>
									<option value=''>Select Gold Colour</option>
									<option value='gold-1'>Gold 1</option>
									<option value='gold-2'>Gold 2</option>
									</select>
									</div>
								<div className='col-md-6 formrow'>
								<p className='inptlabel'>Gold Purity* </p>
									<select onChange={(e)=>setgoldPuri(e.target.value)} className='inputtext'>
									<option value=''>Select Gold Purity</option>
									<option value='24'>24 K</option>
									<option value='22'>22 k</option>
									</select>
								</div>
								<div className='col-md-12 formrow'>
									<p className='inptlabel'>Upload Your Design* <span className='inptinfo'>(upload your design idea)</span></p>
									
									<input className='inputtext' type='file'  onChange={(e)=>setfilename(e.target.files[0])}
                                           valid={true} placeholder='Choose a file to upload'></input>
								</div>
								
								<div className='col-md-6 formrow'>
								<p className='inptlabel'>Diamond Clarity* </p>
									<select selected name="diamndpuri" onChange={(e)=>setdiamondPuri(e.target.value)} className='inputtext'>
									<option value=''>Select Diamond Clarity</option>
									<option value='100'>100%</option>
									<option value='100'>95 %</option>
									</select>
								</div>
								<div className='col-md-6 formrow'>
								<p className='inptlabel'>Quantity* </p>
									<select name="goldpuri" onChange={(e)=>setquanity(e.target.value)} className='inputtext'>
									<option value=''>Select Quantity</option>
									<option value='1'>1</option>
									<option value='2'>2</option>
									</select>
								</div>
								<div className='col-md-6 formrow'>
								<p className='inptlabel'>Type* </p>
									<select selected onChange={(e)=>settype(e.target.value)} className='inputtext'>
									<option value=''>Select Type</option>
									<option value='Neckless'>Neckless</option>
									<option value='Neckless'>Bengals</option>
									</select>
								</div>
								<div className='col-md-6 formrow'>
								<p className='inptlabel'>All the details provided will be confidential </p>
														<input className="btn" onClick={(e)=>submitdesing()} type="button" value="Submit"/>
														
								</div>
							</form>
							</div>				
						</div>
				</div>
			




		</div>
	</div>


			</div>
				
				
	
    </div>
  );
}

export default Home;

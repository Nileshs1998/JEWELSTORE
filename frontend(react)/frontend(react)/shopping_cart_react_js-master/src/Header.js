
import { useEffect,useState } from 'react';
import './App.css';
import Menu from './Menu';
import {httpPost,httpPostwithToken} from './HttpConfig';
import {CartContextValue} from './ContextProvider';
import {LoginContextValue} from './LoginContextProvider';
import { Link } from 'react-router-dom';
import {LoginContextProvider, loginState, reducer } from './LoginContextProvider'


export default function Header() {


	const isloggedin=localStorage.getItem("token");
	const userid=localStorage.getItem("user_id");


    const[mobile,setMobile] = useState('');
	const[password,setPassword] = useState('');
    const[respassword,setRePassword] = useState('');
    const[email,setEmail] = useState('');
    const[showCartPopup,setShowCartPopup] = useState(false);
	const[name,setName] = useState('');
	const [sign_in_up_model,setsignin_up_model] = useState('');
	const [profile_model,setprofile_model] = useState('');
	const [cartData,dispatch] = CartContextValue()
	
	const [orderlist,setOrderList] = useState([]);

	useEffect(()=>{
		if(isloggedin)
		{
			getuserorders();
		}
		//TODO check user login
		
	},[])

	const logoutapi=()=>
	{
		localStorage.clear();
		alert("Logout Successfull");
		window.location.href = '/';

		
	}

	const getuserorders = ()=>{

		
			httpPostwithToken("addtocart/getAllCheckoutByUserId",{}).
		then((res)=>{
			res.json().then(response=>{
				if(res.ok){
					setOrderList(response);
					console.log(response);
				}else{
					alert("Error in category api..")
				}
			})
			
			
		})

		

		
		
	}

    const signUpApi=()=>{
		if(mobile == ""){
			alert("Mobile should not be empty");
			return;
		}else if(name == ""){
			alert("Name should not be empty");
			return;
		}else if(email == ""){
			alert("Email should not be empty");
			return;
		}else if(password == ""){
			alert("password should not be empty");
			return;
		}else if(respassword == ""){
			alert("Repassword should not be empty");
			return;
		}else if(password != respassword){
			alert("Password and Repassword should be same");
			return;
		}
		let jsonOBj ={ 
				"name":name,
				"mobile":mobile,
				"password":password ,
				"email":email
			}
				
		httpPost("signup/user",jsonOBj)
		.then(res => res.json())
		.then((res)=>{
			if(res.hasOwnProperty('id')){
				alert("Registration success.please sign in");
				setMobile('');
				setPassword('');
				setRePassword("");
				setEmail("")
				setName('');
				setsignin_up_model('sign-in')//hide the sign up model.
			}else{
				alert(res['message']);	
			}
			
			//console.log(res);
			
		},error=>{
			alert(error.message);
		}
		)
    }
    
	const getTotalAmount=()=>{
		return cartData.cartItems.reduce((prevValue,currentValue)=>prevValue+currentValue.price,0);
	}
    const loginApi = ()=>{
		if(mobile == ""){
			alert("Mobile should not be empty");
			return;
		}else if(password == ""){
			alert("password should not be empty");
			return;
		}
		let jsonOBj = {"mobile":mobile,"password":password }
		
		httpPost("login/user",jsonOBj)
		.then(res => res.json())
		.then((res)=>{
			if(res['token'] != null)
			{
				let jsonOBj = {"token":res['token'],"userid":res['user_id'],"mobile":mobile,"password":password }
				
				localStorage.setItem("token",res['token']);//token
				localStorage.setItem("user_id",res['user_profile_details']['user_id']);//user_id
				localStorage.setItem("user_email",res['user_profile_details']['email']);//user_id
				localStorage.setItem("user_mobile",res['user_profile_details']['mobile']);//user_id
				localStorage.setItem("user_name",res['user_profile_details']['name']);//user_id
				setsignin_up_model('')//hide the sign up model.
				window.location.href = '/';
				//getCategory();
			}else{
				alert(res['message']);	
			}
			
			//console.log(res);
			
		},error=>{
			alert(error.message);
		}
		)
	}
    return (
        <>
        <div className="header" id="home1">
		<div className="container">
			<div className="w3l_login">
				{!isloggedin?
				<a href="javascript:void(0)" onClick={()=>setsignin_up_model('sign-in')} data-toggle="modal" data-target="#myModal88"><span className="glyphicon glyphicon-user" aria-hidden="true"></span></a>
			
				:
				<a href="javascript:void(0)" onClick={()=>setprofile_model('sign-pro')} data-toggle="modal" data-target="#myModal89"><span className="glyphicon glyphicon-lock" aria-hidden="true"></span></a>
			}
				</div>
			<div className="w3l_logo">
				<h1><a href="#">Jewellary Store<span>One Store. Multiple Options.</span></a></h1>
			</div>
			
			<div className="cart cart box_1"> 
					<button onClick={()=>setShowCartPopup(true)} className="w3view-cart" type="submit" name="submit" value="">
                        <i className="fa fa-cart-arrow-down" aria-hidden="true"></i>
						<span className="cart_count">{cartData.cartItems.length}</span>
                    </button>
					
			</div>  
		</div>
	</div>
  <Menu></Menu>
        <div className={(showCartPopup?'active':'')} id="w3lssbmincart">
		{isloggedin?
		<Link to={"/checkoutcart/"}>Checkout Your Cart</Link>		
		:
		<Link to={"/"}>Your Cart</Link>		
	}
		
			
                <div onClick={()=>setShowCartPopup(false)}  style={{float:'right',cursor:'pointer'}}>X</div>
			<ul>  
				{
					cartData.cartItems.map(cartObj=>(
					<li key={cartObj.id} className="sbmincart-item sbmincart-item-changed">       
					   <div className="sbmincart-details-name">             
					  <a className="sbmincart-name">{cartObj.productName}</a>      
						<ul className="sbmincart-attributes">                                                            
					   </ul>     
				   </div>         
				   <div className="sbmincart-details-quantity"> 
						 {/* <input data-sbmincart-idx="0" name="quantity_1" type="text" pattern="[0-9]*" value="1" autocomplete="off"/>        */}
				   	<span  className="sbmincart-quantity">{cartObj.qty}</span>
				   </div>         
				   <div className="sbmincart-details-remove">          
					   <button type="button" className="sbmincart-remove" data-sbmincart-idx="0">×</button>     
				   </div>        
				   <div className="sbmincart-details-price">           
					 <span className="sbmincart-price">{cartObj.price}</span>       
				   </div>     
		   </li> 
					))
				}      
			  
		    
           </ul>
		   <div>
			   <span>Total: </span>
			   
					<span>Rs.{	getTotalAmount()}</span>
					
					
		   </div>
           
           </div>

    <div className={"modal "+ sign_in_up_model} id="myModal88" >
		<div className="modal-dialog modal-lg">
			<div className="modal-content">
				<div className="modal-header">
					<button onClick={()=>setsignin_up_model('')} type="button" className="close" data-dismiss="modal" aria-hidden="true">
						&times;</button>
					<h4 className="modal-title" id="myModalLabel">

					{(() => {
        switch (sign_in_up_model) {
          case 'sign-in':
            return "SignIn"
          case 'sign-up':
			return "Register"
         
          
        }
      })()}
						
						
						
					</h4>
				</div>
				<div className="modal-body  modal-body-sub">
					<div className="row">
						<div className="col-md-12 modal_body_left modal_body_left1">
							<div className="sap_tabs">

								<div id="horizontalTab">
								
									
									<ul>
										
									
										<li onClick={()=>setsignin_up_model('sign-in')} className="resp-tab-item" aria-controls="tab_item-0"><span>Sign in</span></li>
										<li onClick={()=>setsignin_up_model('sign-up')}  className="resp-tab-item" aria-controls="tab_item-1"><span>Sign up</span></li>
										
										</ul>		
									<div className="tab-1 sign-in resp-tab-content" aria-labelledby="tab_item-0">
										<div className="facts">
											<div className="register">
												
												<form action="#" method="post">			
													<input onChange={(e)=>setMobile(e.target.value)} name="Mobile" placeholder="Enter Mobile" type="text" required=""/>						
													<input onChange={(e)=>setPassword(e.target.value)}  name="Password" placeholder="Password" type="password" required=""/>										
													<div className="sign-up">
														<input className="btn" onClick={()=>loginApi()} type="button" value="Sign in"/>
													</div>
												</form>
											</div>
										</div> 
									</div>	 
									<div className="tab-2 sign-up resp-tab-content" aria-labelledby="tab_item-1">
										<div className="facts">
											<div className="register">
											
												<form action="#" method="post">			
													<input onChange={(e)=>setName(e.target.value)} placeholder="Enter Name" name="Name" type="text" required=""/>
													<input onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email Address" name="Email" type="email" required=""/>	
													<input onChange={(e)=>setMobile(e.target.value)} placeholder="Enter Mobile" name="mobile" type="text" required=""/>	
													<input onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password" name="Password" type="password" required=""/>	
													<input onChange={(e)=>setRePassword(e.target.value)} placeholder="Enter Confirm Password" name="Password" type="password" required=""/>
													<div className="sign-up">
														<input className="btn" onClick={()=>signUpApi()} type="button" value="Sign Up"/> 
													</div>
												</form>
											</div>
										</div>
									</div> 
									 				        					            	      
								</div>	
							</div>
							
							
						</div>
						{/* <div className="col-md-4 modal_body_right modal_body_right1">
							<div className="row text-center sign-with">
								<div className="col-md-12">
									<h3 className="other-nw">Sign in with</h3>
								</div>
								<div className="col-md-12">
									<ul className="social">
										<li className="social_facebook"><a href="#" className="entypo-facebook"></a></li>
										<li className="social_dribbble"><a href="#" className="entypo-dribbble"></a></li>
										<li className="social_twitter"><a href="#" className="entypo-twitter"></a></li>
										<li className="social_behance"><a href="#" className="entypo-behance"></a></li>
									</ul>
								</div>
							</div>
						</div> */}
					</div>
				</div>
			</div>
		</div>
	</div>

	<div className={"modal "+ profile_model} id="myModal89" >
		<div className="modal-dialog modal-lg">
			<div className="modal-content">
				<div className="modal-header">
					<button onClick={()=>setprofile_model('')} type="button" className="close" data-dismiss="modal" aria-hidden="true">
						&times;</button>
					<h4 className="modal-title" id="myModalLabel">
						Account
					
						
						
						
					</h4>
				</div>
				<div className="modal-body  modal-body-sub">
					<div className="row">
						<div className="col-md-12 modal_body_left modal_body_left1">
							<div className="sap_tabs">

								<div id="horizontalTab">
								
									
									<ul>
										
									
										<li onClick={()=>setprofile_model('sign-pro')} className="resp-tab-item" aria-controls="tab_item-2"><span>Profile</span></li>
										<li onClick={()=>setprofile_model('sign-orders')}  className="resp-tab-item" aria-controls="tab_item-3"><span>Orders</span></li>
										
										</ul>		
									<div className="tab-3 sign-pro resp-tab-content" aria-labelledby="tab_item-2">
										<div className="facts">
											<div className="register">
											<form action="#" method="post">			
													<input disabled value={localStorage.getItem('user_name')}  type="text" />
													<input disabled value={localStorage.getItem('user_email')} type="text" />	
													<input disabled value={localStorage.getItem('user_mobile')} type="text"  />	
													<div className="sign-up">
														<input className="btn" onClick={()=>logoutapi()} type="button" value="Logout"/> 
													</div>
												</form>
												
											</div>
										</div> 
									</div>	 
									<div className="tab-4 sign-orders resp-tab-content" aria-labelledby="tab_item-3">
										<div className="facts">
											<div className="register">
											<table className="styled-table">
												<thead>
        <tr>
          <th>Sr.No</th>
          <th>product Name</th>
		  <th>Quantity</th>
		  <th>price</th>
          <th>Status</th>
        </tr>
		</thead>
		<tbody>
			{
				orderlist.map((orderobj,i)=>(
					
					orderobj.product?
						<tr>
         				 <th>{i+1}</th>
          					<th>{orderobj.product.name}</th>
		  					<th>{orderobj.qty}</th>
		 				 <th>{orderobj.price}</th>
         				 <th>{orderobj.payment_type}</th>
       					 </tr>
						 :
						 <tr>
         				 <th>{i+1}</th>
          					<th>CUSTOME</th>
		  					<th>{orderobj.qty}</th>
		 				 <th>{orderobj.price}</th>
         				 <th>{orderobj.payment_type}</th>
       					 </tr>

					))
			}
		
		
		</tbody>
        
      </table>
												
											</div>
										</div>
									</div> 
													        					            	      
								</div>	
							</div>
							
							
						</div>
						{/* <div className="col-md-4 modal_body_right modal_body_right1">
							<div className="row text-center sign-with">
								<div className="col-md-12">
									<h3 className="other-nw">Sign in with</h3>
								</div>
								<div className="col-md-12">
									<ul className="social">
										<li className="social_facebook"><a href="#" className="entypo-facebook"></a></li>
										<li className="social_dribbble"><a href="#" className="entypo-dribbble"></a></li>
										<li className="social_twitter"><a href="#" className="entypo-twitter"></a></li>
										<li className="social_behance"><a href="#" className="entypo-behance"></a></li>
									</ul>
								</div>
							</div>
						</div> */}
					</div>
				</div>
			</div>
		</div>
	</div>
           </>
    )
}


 
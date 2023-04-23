

import './App.css';
import { useEffect, useState } from 'react';
import {httpPost,httpPostwithToken,formdatahttpPostwithToken} from './HttpConfig';
function Menu() {
	const [categoryList,setCategoryList] = useState([]);

	const isloggedin=localStorage.getItem("token");
	const userid=localStorage.getItem("user_name");

	useEffect(()=>{
		//TODO check user login
		getCategory();
		
	},[])
	
	const getCategory = ()=>{
		httpPost("product/getAllCategory",{}).
		then((res)=>{
			res.json().then(response=>{
				if(res.ok){
					setCategoryList(response);
					
				}else{
					alert("Error in category api..")
				}
			})
			
			
		})
	}

  return (
    <div className="navigation">
		<div className="container">
			<nav className="navbar navbar-default">
				
				<div className="navbar-header nav_2">
					<button type="button" className="navbar-toggle collapsed navbar-toggle1" data-toggle="collapse" data-target="#bs-megadropdown-tabs">
						<span className="sr-only">Toggle navigation</span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
					</button>
				</div> 
				<div className="collapse navbar-collapse" id="bs-megadropdown-tabs">
					<ul className="nav navbar-nav">
					<li><a  className="profile">
					<span className="glyphicon glyphicon-user" aria-hidden="true"></span>
						{!isloggedin?
						"WELCOME GUEST"
						:
						"Welcome "+userid
					}
					 </a></li>	
						<li><a href="/" className="">Home</a></li>	
						
						{
						categoryList.map((obj)=>(
							<li><a key={obj.id} href={("/category/"+obj.id+"")}>{obj.name}</a></li> 
							))
						}
						
						
						<li><a href="#customedes" >Customize Your Design</a></li>
						 
						 
						
					</ul>
				</div>
			</nav>
		</div>
	</div>
  );
}

export default Menu;

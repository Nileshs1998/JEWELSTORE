package com.JwellaryStoreApp.POJO;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "design")
public class Design 
{
	@Id
	long id;
	
	int qty,status; 
	Long user_id;
	
	String gold_color,gold_purity,diamond_clarity,filename,type;
	
	
	@Column(updatable=false, insertable=false)
	String added_date;
	
	double price;
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public int getQty() {
		return qty;
	}

	public void setQty(int qty) {
		this.qty = qty;
	}

	public Long getUser_id() {
		return user_id;
	}

	public void setUser_id(Long user_id) {
		this.user_id = user_id;
	}

	public String getAdded_date() {
		return added_date;
	}

	public void setAdded_date(String added_date) {
		this.added_date = added_date;
	}

	public String getGold_color() {
		return gold_color;
	}

	public void setGold_color(String gold_color) {
		this.gold_color = gold_color;
	}

	public String getGold_purity() {
		return gold_purity;
	}

	public void setGold_purity(String gold_purity) {
		this.gold_purity = gold_purity;
	}

	public String getDiamond_clarity() {
		return diamond_clarity;
	}

	public void setDiamond_clarity(String diamond_clarity) {
		this.diamond_clarity = diamond_clarity;
	}

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}
	
	
	
	
	
	

}

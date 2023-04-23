package com.JwellaryStoreApp.POJO;

public class ResultVO 
{
	public int code;
	public boolean status;
	public String message;
	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	@Override
	public String toString() {
		return "ResultVO [code=" + code + ", status=" + status + ", message=" + message + "]";
	}
	public ResultVO(int code, boolean status, String message) {
		super();
		this.code = code;
		this.status = status;
		this.message = message;
	}
	
	
	
	

}

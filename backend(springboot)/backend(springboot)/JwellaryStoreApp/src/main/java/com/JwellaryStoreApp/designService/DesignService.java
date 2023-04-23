package com.JwellaryStoreApp.designService;

import org.springframework.web.multipart.MultipartFile;

import com.JwellaryStoreApp.POJO.Design;

public interface DesignService {

	boolean newdesignupload(MultipartFile file, Design design);

	

}

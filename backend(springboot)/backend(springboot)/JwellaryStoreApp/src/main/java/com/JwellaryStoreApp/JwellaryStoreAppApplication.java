package com.JwellaryStoreApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.JwellaryStoreApp.designService.FileStorageProperties;

@SpringBootApplication
@EnableConfigurationProperties({
    FileStorageProperties.class
})
public class JwellaryStoreAppApplication {
	
	

	public static void main(String[] args) {
		SpringApplication.run(JwellaryStoreAppApplication.class, args);
	}

}

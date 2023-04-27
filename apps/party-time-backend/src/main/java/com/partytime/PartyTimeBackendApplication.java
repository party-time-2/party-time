package com.partytime;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main Entrypoint for Party Time Backend
 */
@SpringBootApplication
public class PartyTimeBackendApplication {

    /**
     * Launches the Application with standard Java main method
     *
     * @param args Passed command line arguments
     */
    public static void main(String[] args) {
        SpringApplication.run(PartyTimeBackendApplication.class, args);
    }

}

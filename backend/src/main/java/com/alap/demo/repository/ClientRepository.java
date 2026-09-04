package com.alap.demo.repository;

import com.alap.demo.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
    Optional<Client> findByClientCode(String clientCode);
    Optional<Client> findByEmail(String email);
    Optional<Client> findByCompany(String company);
}

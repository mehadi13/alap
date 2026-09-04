package com.alap.demo.repository;

import com.alap.demo.model.Consultation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConsultationRepository extends JpaRepository<Consultation, String> {
    Page<Consultation> findByStatusIgnoreCase(String status, Pageable pageable);
    List<Consultation> findAllByOrderByCreatedAtDesc();
}

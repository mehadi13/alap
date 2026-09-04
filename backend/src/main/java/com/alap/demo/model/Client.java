package com.alap.demo.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "clients")
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "client_code", unique = true)
    private String clientCode;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String company;

    private String email;

    private String phone;

    private String industry;

    private String solution;

    private String status = "Onboarding"; // Active, Onboarding, In Consultation, Inactive

    private String monthlyValue = "$500 / mo";

    private String startDate;

    private String lastContact;

    @Column(length = 2000)
    private String notes;

    private LocalDateTime createdAt = LocalDateTime.now();

    public Client() {}

    public Client(String clientCode, String name, String company, String email, String phone,
                  String industry, String solution, String status, String monthlyValue,
                  String startDate, String lastContact, String notes) {
        this.clientCode = clientCode;
        this.name = name;
        this.company = company;
        this.email = email;
        this.phone = phone;
        this.industry = industry;
        this.solution = solution;
        this.status = status;
        this.monthlyValue = monthlyValue;
        this.startDate = startDate;
        this.lastContact = lastContact;
        this.notes = notes;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClientCode() {
        return clientCode;
    }

    public void setClientCode(String clientCode) {
        this.clientCode = clientCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public String getSolution() {
        return solution;
    }

    public void setSolution(String solution) {
        this.solution = solution;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMonthlyValue() {
        return monthlyValue;
    }

    public void setMonthlyValue(String monthlyValue) {
        this.monthlyValue = monthlyValue;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getLastContact() {
        return lastContact;
    }

    public void setLastContact(String lastContact) {
        this.lastContact = lastContact;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}

package com.hms.controller;

import com.hms.dto.SpecialtyDto;
import com.hms.service.SpecialtyService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/specialties")
@CrossOrigin(origins = "*")
public class SpecialtyController {

    private final SpecialtyService specialtyService;

    public SpecialtyController(SpecialtyService specialtyService) {
        this.specialtyService = specialtyService;
    }

    @GetMapping
    public ResponseEntity<List<SpecialtyDto>> getAllSpecialties() {
        return ResponseEntity.ok(specialtyService.getAllSpecialties());
    }

    @PostMapping
    public ResponseEntity<SpecialtyDto> createSpecialty(@Valid @RequestBody SpecialtyDto specialtyDto) {
        return new ResponseEntity<>(specialtyService.createSpecialty(specialtyDto), HttpStatus.CREATED);
    }
}

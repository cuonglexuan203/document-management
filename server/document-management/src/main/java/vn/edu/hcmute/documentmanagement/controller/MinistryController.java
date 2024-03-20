package vn.edu.hcmute.documentmanagement.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.hcmute.documentmanagement.dto.MinistryDto;
import vn.edu.hcmute.documentmanagement.model.Ministry;
import vn.edu.hcmute.documentmanagement.service.MinistryService;

import java.util.List;

@RestController
@RequestMapping("/ministries")
@CrossOrigin(origins = "*")
public class MinistryController {
    private final MinistryService ministryService;

    public MinistryController(MinistryService ministryService) {
        this.ministryService = ministryService;
    }

    @GetMapping
    public ResponseEntity<MinistryDto> getMinistries(){
        return ResponseEntity.ok(MinistryDto.builder().ministries(ministryService.getAllMinistryNames()).build());
    }

}

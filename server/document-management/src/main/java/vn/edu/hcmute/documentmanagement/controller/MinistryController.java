package vn.edu.hcmute.documentmanagement.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmute.documentmanagement.dto.MinistryDto;
import vn.edu.hcmute.documentmanagement.model.Ministry;
import vn.edu.hcmute.documentmanagement.service.MinistryService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/ministries")
@CrossOrigin(origins = "*")
public class MinistryController {
    private final MinistryService ministryService;

    public MinistryController(MinistryService ministryService) {
        this.ministryService = ministryService;
    }

    @GetMapping
    public ResponseEntity<List<MinistryDto>> getMinistries(){
        return ResponseEntity.ok(MinistryDto.of(ministryService.getAllMinistries()));
    }
    @GetMapping("/{id}")
    public ResponseEntity<MinistryDto> getMinistryById(@PathVariable long id){
        String errorMessage = "Ministry not found with id: " + id;
        return ResponseEntity.ok(MinistryDto.of(ministryService.getMinistryByIdOrElseThrow(id, errorMessage)));
    }

}

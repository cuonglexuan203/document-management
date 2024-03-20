package vn.edu.hcmute.documentmanagement.controller;

import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.Parameter;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmute.documentmanagement.dto.DocumentDto;
import vn.edu.hcmute.documentmanagement.dto.SearchDto;
import vn.edu.hcmute.documentmanagement.model.Document;
import vn.edu.hcmute.documentmanagement.service.DocumentService;
import vn.edu.hcmute.documentmanagement.service.UserService;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/documents")
@CrossOrigin(origins = "*")
public class SearchController {
    private final DocumentService documentService;
    public SearchController(DocumentService documentService, UserService userService) {
        this.documentService = documentService;
    }

    @GetMapping("/search")
    public ResponseEntity<SearchDto> searchDocument(@RequestParam(defaultValue = "document") String keyword,
                                                    @RequestParam(defaultValue = "-1") int page) {
        int size = 10;
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(SearchDto.of(documentService.getDocumentByTitle(keyword, pageable)));
    }


}

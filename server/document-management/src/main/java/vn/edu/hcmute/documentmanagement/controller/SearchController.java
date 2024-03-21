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

import java.lang.annotation.Repeatable;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/search")
@CrossOrigin(origins = "*")
public class SearchController {
    private final DocumentService documentService;
    public SearchController(DocumentService documentService, UserService userService) {
        this.documentService = documentService;
    }

    @GetMapping
    public ResponseEntity<SearchDto> searchDocument(@RequestParam(name = "q",defaultValue = "", required = false) String keyword,
                                                    @RequestParam(name = "page",defaultValue = "0",required = false) int page) {
        int size = 10;
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(SearchDto.of(documentService.getDocumentByTitle(keyword, pageable)));
    }

    @GetMapping
    public ResponseEntity<SearchDto> searchDocumentByTitleAndMinistry(@RequestParam(name = "q",defaultValue = "", required = false) String keyword,
                                                                       @RequestParam(name = "page",defaultValue = "0",required = false) String ministry){
        return ResponseEntity.ok(SearchDto.of(documentService.getDocumentByTitleAndMinistry(keyword, ministry)));
    }


}

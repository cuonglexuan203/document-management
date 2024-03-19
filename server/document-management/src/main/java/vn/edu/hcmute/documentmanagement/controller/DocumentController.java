package vn.edu.hcmute.documentmanagement.controller;

import org.springframework.web.bind.annotation.*;
import vn.edu.hcmute.documentmanagement.dto.DocumentDto;
import vn.edu.hcmute.documentmanagement.model.Document;
import vn.edu.hcmute.documentmanagement.service.DocumentService;

import javax.print.Doc;
import java.util.List;

@RestController
@RequestMapping("/documents")
@CrossOrigin(origins = "*")
public class DocumentController {
    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @GetMapping("/{id}")
    public DocumentDto getDocument(@PathVariable long id) {
        String message = "Document not found with id: " + id;
        return DocumentDto.of(documentService.getDocumentByIdOrElseThrow(id, message));
    }

    @GetMapping
    public List<DocumentDto> getDocuments() {
        return DocumentDto.of(documentService.getAllDocuments());
    }

    @GetMapping("/users/{userId}")
    public List<DocumentDto> getDocumentsByUserId(@PathVariable long userId) {
        return DocumentDto.of(documentService.getDocumentByUserId(userId));
    }

}

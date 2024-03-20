package vn.edu.hcmute.documentmanagement.controller;

import jakarta.validation.constraints.NotNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmute.documentmanagement.dto.DocumentDto;
import vn.edu.hcmute.documentmanagement.model.Document;
import vn.edu.hcmute.documentmanagement.model.Ministry;
import vn.edu.hcmute.documentmanagement.model.User;
import vn.edu.hcmute.documentmanagement.service.DocumentService;
import vn.edu.hcmute.documentmanagement.service.MinistryService;
import vn.edu.hcmute.documentmanagement.service.UserService;
import vn.edu.hcmute.documentmanagement.util.CustomResponse;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/documents")
@CrossOrigin(origins = "*")
public class DocumentController {
    private final DocumentService documentService;
    private final UserService userService;
    private final MinistryService ministryService;


    public DocumentController(DocumentService documentService, UserService userService, MinistryService ministryService) {
        this.documentService = documentService;
        this.userService = userService;
        this.ministryService = ministryService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<DocumentDto> getDocument(@PathVariable long id) {
        String errorMessage = "Document not found with id: " + id;
        return ResponseEntity.ok(DocumentDto.of(documentService.getDocumentByIdOrElseThrow(id, errorMessage)));
    }

    @GetMapping
    public ResponseEntity<List<DocumentDto>> getDocuments() {
        return ResponseEntity.ok(DocumentDto.of(documentService.getAllDocuments()));
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<List<DocumentDto>> getDocumentsByUserId(@PathVariable long userId) {
        return ResponseEntity.ok(DocumentDto.of(documentService.getDocumentByUserId(userId)));
    }
    private CustomResponse validateMutationDocument(@NotNull DocumentDto docDto){
        long userId = docDto.getUserId();
        String ministryName = docDto.getMinistry();
        log.info("Provided document - userid: {}, ministry: {}", userId, ministryName);
        //
        if (userId <= 0 || ministryName.isBlank()) {
            return CustomResponse.badRequest("The user id must be greater than 0 and ministry must be valid");
        }
        User owner = userService.getUserByIdOrElseThrow(userId, "User not found with id: " + userId);
        Ministry ministry = ministryService.getMinistryByName(ministryName).getFirst();
        if (owner == null || ministry == null) {
            return CustomResponse.notFound("Could not find the user or ministry of provided document");
        }
        return CustomResponse.ok("validated document");
    }
    @PostMapping
    public ResponseEntity<CustomResponse> addDocument(@RequestBody DocumentDto docDto) {
        CustomResponse response = validateMutationDocument(docDto);
        int statusCode = response.getStatus();
        switch (statusCode) {
            case 200:{
                break;
            }
            case 400:{
                return ResponseEntity.badRequest().body(response);
            }
            case 404:{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            case 500:{
                break;
            }
        }
        User owner = userService.getUserById(docDto.getUserId()).get();
        Ministry ministry = ministryService.getMinistryByName(docDto.getMinistry()).getFirst();
        Document doc = DocumentDto.toDocument(docDto, owner, ministry);
        documentService.addDocument(doc);
        return ResponseEntity.ok(CustomResponse.ok("Successfully added"));
    }

    @PutMapping
    public ResponseEntity<CustomResponse> updateDocument(@RequestBody DocumentDto docDto) {
        CustomResponse response = validateMutationDocument(docDto);
        int statusCode = response.getStatus();
        switch (statusCode) {
            case 200:{
                break;
            }
            case 400:{
                return ResponseEntity.badRequest().body(response);
            }
            case 404:{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            case 500:{
                break;
            }
        }
        User owner = userService.getUserById(docDto.getUserId()).get();
        Ministry ministry = ministryService.getMinistryByName(docDto.getMinistry()).getFirst();
        Document doc = DocumentDto.toDocument(docDto, owner, ministry);
        documentService.updateDocument(doc);
        return ResponseEntity.ok(CustomResponse.ok("Successfully updated"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<CustomResponse> deleteDocument(@PathVariable long id){
        documentService.deleteDocument(id);
        return ResponseEntity.ok(CustomResponse.ok("Successfully deleted"));
    }

}

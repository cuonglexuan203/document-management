package vn.edu.hcmute.documentmanagement.service.impls;

import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.edu.hcmute.documentmanagement.exception.ResourceNotFoundException;
import vn.edu.hcmute.documentmanagement.model.Document;
import vn.edu.hcmute.documentmanagement.model.Ministry;
import vn.edu.hcmute.documentmanagement.repository.DocumentRepository;
import vn.edu.hcmute.documentmanagement.service.DocumentService;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DocumentServiceImpl implements DocumentService {
    private final DocumentRepository docRepo;
    public DocumentServiceImpl(DocumentRepository docRepo) {
        this.docRepo = docRepo;
    }

    @Override
    public List<Document> getAllDocuments() {
        return docRepo.findAll();
    }

    @Override
    public List<Document> getAllDocuments(Pageable paginator) {
        return docRepo.findAll(paginator).getContent();
    }

    @Override
    public Optional<Document> getDocumentById(long id) {
        return docRepo.findById(id);
    }

    @Override
    public Document getDocumentByIdOrElseThrow(long id, String message) {
        Document document = docRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException(message));
        return document;
    }

    @Override
    public List<Document> getDocumentByTitle(String keyword) {
        List<Document> documents = docRepo.findByTitleContainingIgnoreCase(keyword);
        return documents;
    }

//    @Override
//    public List<Document> getDocumentByTitle(String keyword, Pageable paginator) {
//        List<Document> documents = docRepo.findByTitleContainingIgnoreCase(keyword, paginator).getContent();
//        return documents;
//    }

    @Override
    public Page<Document> getDocumentByTitle(String keyword, Pageable paginator) {
        Page<Document> documents = docRepo.findByTitleContainingIgnoreCase(keyword, paginator);
        return documents;
    }

    @Override
    public List<Document> getDocumentByVersion(String version) {
        return docRepo.findByVersion(version);
    }

    @Override
    public List<Document> getDocumentByVersion(String version, Pageable paginator) {
        return docRepo.findByVersion(version, paginator).getContent();
    }

    @Override
    public List<Document> getDocumentByMinistry(Ministry ministry) {
        return docRepo.findByMinistry(ministry);
    }

    @Override
    public List<Document> getDocumentByMinistry(Ministry ministry, Pageable paginator) {
        return docRepo.findByMinistry(ministry, paginator).getContent();
    }

    @Override
    public List<Document> getDocumentByTitleAndMinistry(String title, Ministry ministry) {
        return docRepo.findByTitleContainingIgnoreCaseAndMinistry(title, ministry);
    }

    @Override
    public List<Document> getDocumentByTitleAndMinistry(String title, Ministry ministry, Pageable paginator) {
        return docRepo.findByTitleContainingIgnoreCaseAndMinistry(title, ministry, paginator).getContent();
    }

    @Override
    public List<Document> getDocumentByTimeRange(Date start, Date end) {
        return docRepo.findByAddedTimeBetween(start, end);
    }

    @Override
    public List<Document> getDocumentByTimeRange(Date start, Date end, Pageable paginator) {
        return docRepo.findByAddedTimeBetween(start, end, paginator).getContent();
    }

    @Override
    public List<Document> getDocumentByUserId(long id) {
        return docRepo.findByUserId(id);
    }

    @Override
    public List<Document> getDocumentByUserId(long id, Pageable paginator) {
        return docRepo.findByUserId(id, paginator).getContent();
    }

    //
    @Override
    public Document addDocument(@Valid Document document) {
        if(document.getId() != 0){
            document.setId(0);
        }
        return docRepo.save(document);
    }
    @Override
    public void associate(Document document, Ministry ministry){
        document.setMinistry(ministry);
        ministry.getDocuments().add(document);
    }
    @Override
    public Document addDocument(Document document, Ministry ministry) {
        if(document.getId() != 0){
            document.setId(0);
        }
        associate(document, ministry);
        return docRepo.save(document);
    }

    @Override
    public List<Document> addAllDocuments(Document[] documents) {
        List<Document> docs = Arrays.asList(documents);
        docs.forEach(ele -> {
            if(ele.getId() != 0){
                ele.setId(0);
            }
        });
        return docRepo.saveAll(docs);
    }

    @Override
    public List<Document> addAllDocuments(List<Document> documents) {
        documents.forEach(doc -> {
            if(doc.getId() != 0){
                doc.setId(0);
            }
        });
        return docRepo.saveAll(documents);
    }

    @Override
    public Document updateDocument(@Valid Document document) {
        long id = document.getId();
        String message = "Document not found with id: " + id;
        getDocumentByIdOrElseThrow(id, message);
        return docRepo.save(document);
    }

    @Override
    public void deleteDocument(long id) {
        String message = "Document not found with id: " + id;
        Document doc = getDocumentByIdOrElseThrow(id, message);
        docRepo.deleteById(id);
        doc.getMinistry().getDocuments().remove(doc);
    }

}

package vn.edu.hcmute.documentmanagement.service;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.edu.hcmute.documentmanagement.model.Document;
import vn.edu.hcmute.documentmanagement.model.Ministry;
import vn.edu.hcmute.documentmanagement.repository.DocumentRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface DocumentService {
    final long DEFAULT_PAGE_SIZE = 10;
    List<Document> getAllDocuments();
    List<Document> getAllDocuments(Pageable paginator);
    Optional<Document> getDocumentById(long id);
    Document getDocumentByIdOrElseThrow(long id, String message);
    List<Document> getDocumentByTitle(String keyword);
    List<Document> getDocumentByTitle(String keyword, Pageable paginator);
    List<Document> getDocumentByVersion(String version);
    List<Document> getDocumentByVersion(String version, Pageable paginator);
    List<Document> getDocumentByMinistry(Ministry ministry);
    List<Document> getDocumentByMinistry(Ministry ministry, Pageable paginator);
    List<Document> getDocumentByTitleAndMinistry(String title, Ministry ministry);
    List<Document> getDocumentByTitleAndMinistry(String title, Ministry ministry, Pageable paginator);
    List<Document> getDocumentByTimeRange(Date start, Date end);
    List<Document> getDocumentByTimeRange(Date start, Date end, Pageable paginator);
    List<Document> getDocumentByUserId(long id);
    List<Document> getDocumentByUserId(long id, Pageable paginator);
    void associate(Document document, Ministry ministry);
    Document addDocument(Document document);
    Document addDocument(Document document, Ministry ministry);
    List<Document> addAllDocuments(Document[] documents);
    List<Document> addAllDocuments(List<Document> documents);
    Document updateDocument(Document document);
    void deleteDocument(long id);
    //
}

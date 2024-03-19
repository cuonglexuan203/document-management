package vn.edu.hcmute.documentmanagement.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.hcmute.documentmanagement.model.Document;
import vn.edu.hcmute.documentmanagement.model.Ministry;

import java.util.Date;
import java.util.List;

public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findByTitleIgnoreCase(String title);
    Page<Document> findByTitleIgnoreCase(String title, Pageable paginator);
    List<Document> findByTitleContainingIgnoreCase(String keyword);
    Page<Document> findByTitleContainingIgnoreCase(String keyword, Pageable paginator);
    List<Document> findByVersion(String version);
    Page<Document> findByVersion(String version, Pageable paginator);
    List<Document> findByMinistry(Ministry ministry);
    Page<Document> findByMinistry(Ministry ministry, Pageable paginator);
    List<Document> findByTitleContainingIgnoreCaseAndMinistry(String keyword, Ministry ministry);
    Page<Document> findByTitleContainingIgnoreCaseAndMinistry(String keyword, Ministry ministry, Pageable paginator);
    List<Document> findByAddedTimeBetween(Date start, Date end);
    Page<Document> findByAddedTimeBetween(Date start, Date end, Pageable paginator);
    List<Document> findByUserId(long id);
    Page<Document> findByUserId(long id, Pageable paginator);

}

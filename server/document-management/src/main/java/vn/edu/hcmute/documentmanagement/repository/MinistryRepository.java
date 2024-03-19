package vn.edu.hcmute.documentmanagement.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.hcmute.documentmanagement.model.Ministry;

import java.util.List;

public interface MinistryRepository extends JpaRepository<Ministry, Long> {
    List<Ministry> findByNameContainingIgnoreCase(String keyword);
    List<Ministry> findByNameContainingIgnoreCase(String keyword, Sort sortor);
}

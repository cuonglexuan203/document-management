package vn.edu.hcmute.documentmanagement.service;

import jakarta.validation.Valid;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import vn.edu.hcmute.documentmanagement.model.Ministry;

import javax.swing.text.html.Option;
import java.awt.print.Pageable;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface MinistryService {
    List<Ministry> getAllMinistries();
    List<Ministry> getAllMinistries(Sort sortor);
    Map<String, List<String>> getAllMinistriesSimple();
    List<String> getAllMinistryNames();
    List<String> getAllMinistryNames(Sort sortor);
    Optional<Ministry> getMinistryById(long id);
    Ministry getMinistryByIdOrElseThrow(long id, String message);
    List<Ministry> getMinistryByName(String keyword);
    List<Ministry> getMinistryByName(String keyword, Sort sortor);
    Ministry addMinistry( Ministry ministry);
    List<Ministry> addAllMinistries( Ministry[] ministries);
    List<Ministry> addAllMinistries( List<Ministry> ministries);
    Ministry updateMinistry(Ministry newMinistry);
    void deleteMinistry(long id);
}

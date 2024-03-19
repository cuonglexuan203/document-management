package vn.edu.hcmute.documentmanagement.service.impls;

import jakarta.validation.Valid;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import vn.edu.hcmute.documentmanagement.exception.ResourceNotFoundException;
import vn.edu.hcmute.documentmanagement.model.Document;
import vn.edu.hcmute.documentmanagement.model.Ministry;
import vn.edu.hcmute.documentmanagement.repository.MinistryRepository;
import vn.edu.hcmute.documentmanagement.service.MinistryService;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class MinistryServiceImpl implements MinistryService {

    private final MinistryRepository ministryRepo;

    public MinistryServiceImpl(MinistryRepository ministryRepo) {
        this.ministryRepo = ministryRepo;
    }

    @Override
    public List<Ministry> getAllMinistries() {
        return ministryRepo.findAll();
    }

    @Override
    public List<Ministry> getAllMinistries(Sort sortor) {
        return ministryRepo.findAll(sortor);
    }

    @Override
    public Map<String, List<String>> getAllMinistriesSimple() {
        Map<String, List<String>> result = new HashMap<>();
        ministryRepo.findAll().stream().forEach(ele ->
                result.put(ele.getName(), ele.getDocuments().stream().map(Document::getTitle).collect(Collectors.toList()))
        );
        return result;
    }

    @Override
    public List<String> getAllMinistryNames() {
        return ministryRepo.findAll().stream().map(Ministry::getName).collect(Collectors.toList());
    }

    @Override
    public List<String> getAllMinistryNames(Sort sortor) {
        return ministryRepo.findAll(sortor).stream().map(Ministry::getName).collect(Collectors.toList());
    }

    @Override
    public Optional<Ministry> getMinistryById(long id) {
        return ministryRepo.findById(id);
    }

    @Override
    public Ministry getMinistryByIdOrElseThrow(long id, String message) {
        Ministry ministry = ministryRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException(message));
        return ministry;
    }

    @Override
    public List<Ministry> getMinistryByName(String keyword) {
        return ministryRepo.findByNameContainingIgnoreCase(keyword);
    }

    @Override
    public List<Ministry> getMinistryByName(String keyword, Sort sortor) {
        return ministryRepo.findByNameContainingIgnoreCase(keyword, sortor);
    }

    @Override
    public Ministry addMinistry(@Valid Ministry ministry) {
        long id = ministry.getId();
        if(id != 0){
            ministry.setId(0);
        }
        return ministryRepo.save(ministry);
    }

    @Override
    public List<Ministry> addAllMinistries(Ministry[] ministries) {
        List<Ministry> ministryList = Arrays.asList(ministries);
        ministryList.forEach(ele -> {
            if(ele.getId() != 0){
                ele.setId(0);
            }
        });
        return ministryRepo.saveAll(ministryList);
    }

    @Override
    public List<Ministry> addAllMinistries(List<Ministry> ministries) {
        ministries.forEach(ele -> {
            if(ele.getId() != 0){
                ele.setId(0);
            }
        });
        return ministryRepo.saveAll(ministries);
    }

    @Override
    public Ministry updateMinistry(Ministry revisedMinistry) {
        long id = revisedMinistry.getId();
        String message = "Ministry not found with id: " + id;
        getMinistryByIdOrElseThrow(id, message);
        return ministryRepo.save(revisedMinistry);
    }

    @Override
    public void deleteMinistry(long id) {
        String message = "Ministry not found with id: " + id;
        getMinistryByIdOrElseThrow(id, message);
        ministryRepo.deleteById(id);
    }
}

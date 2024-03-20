package vn.edu.hcmute.documentmanagement.dto;


import jakarta.annotation.Nullable;
import lombok.*;
import org.springframework.data.domain.Page;
import vn.edu.hcmute.documentmanagement.model.Document;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PRIVATE, force = true)
public class SearchDto {
    @Nullable
    private List<DocumentDto> document;
    private int totalPages;

    public static SearchDto of(Page<Document> documentPage) {
        return SearchDto.builder().document(DocumentDto.of(documentPage.getContent())).totalPages(documentPage.getNumberOfElements()).build();
    }
}

package vn.edu.hcmute.documentmanagement.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import vn.edu.hcmute.documentmanagement.model.Document;
import vn.edu.hcmute.documentmanagement.model.Ministry;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PRIVATE, force = true)
public class DocumentDto {

    @Min(value = 0)
    private long id;

    @NotBlank(message = "title is required")
    private String title;

    private String thumbnail;
    private String version;
    private Date addedTime;
    private String description;

    @NotNull(message = "path is required")
    private String path;

    @NotEmpty(message = "ministry is required")
    private String ministry;

    public static DocumentDto of(Document doc) {
        DocumentDto docDto = DocumentDto.builder()
                .id(doc.getId())
                .title(doc.getTitle())
                .thumbnail(doc.getThumbnail())
                .version(doc.getVersion())
                .addedTime(doc.getAddedTime())
                .description(doc.getDescription())
                .path(doc.getPath())
                .ministry(doc.getMinistry().getName()).build();
        return docDto;
    }
    public static List<DocumentDto> of(List<Document> documents){
        List<DocumentDto> docDtoList = documents.stream().map(DocumentDto::of).toList();
        return docDtoList;
    }
}


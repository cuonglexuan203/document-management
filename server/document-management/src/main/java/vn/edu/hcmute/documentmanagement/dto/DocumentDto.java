package vn.edu.hcmute.documentmanagement.dto;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.*;
import lombok.*;
import vn.edu.hcmute.documentmanagement.model.Document;
import vn.edu.hcmute.documentmanagement.model.Ministry;
import vn.edu.hcmute.documentmanagement.model.User;
import vn.edu.hcmute.documentmanagement.util.CustomDate;

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
    private long id = 0;

    @NotBlank(message = "title is required")
    private String title;

    @Nullable
    private String thumbnail;

    @Nullable
    private String version;

    @NotNull
    private String addedTime = new CustomDate().getRightNow();

    @Nullable
    private String description;

    @NotNull(message = "path is required")
    private String path;

    @NotEmpty(message = "ministry is required")
    private String ministry;

    @Min(value = 1)
    private long userId;

    public static DocumentDto of(Document doc) {
        DocumentDto docDto = DocumentDto.builder()
                .id(doc.getId())
                .title(doc.getTitle())
                .thumbnail(doc.getThumbnail())
                .version(doc.getVersion())
                .addedTime(doc.getAddedTime().toString())
                .description(doc.getDescription())
                .path(doc.getPath())
                .ministry(doc.getMinistry().getName())
                .userId(doc.getUser().getId()).build();
        return docDto;
    }

    public static List<DocumentDto> of(List<Document> documents) {
        List<DocumentDto> docDtoList = documents.stream().map(DocumentDto::of).toList();
        return docDtoList;
    }

    public static Document toDocument(DocumentDto docDto, User owner, Ministry ministry) {
        Document doc = Document.builder()
                .id(docDto.getId())
                .title(docDto.getTitle())
                .thumbnail(docDto.getThumbnail())
                .version(docDto.getVersion())
                .addedTime(new CustomDate().parse(docDto.getAddedTime()))
                .description(docDto.getDescription())
                .path(docDto.getPath())
                .build();
        doc.addUser(owner);
        doc.addMinistry(ministry);
        return doc;
    }
}


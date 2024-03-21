package vn.edu.hcmute.documentmanagement.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import vn.edu.hcmute.documentmanagement.model.Ministry;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PRIVATE, force = true)
public class MinistryDocumentDto {
    @NotNull
    private  long id;
    @NotNull
    private String ministry;
    @NotNull
    private List<DocumentDto> documents;

    public static MinistryDocumentDto of(@NotNull Ministry ministry){
        MinistryDocumentDto ministryDocumentDto = MinistryDocumentDto.builder()
                .id(ministry.getId())
                .ministry(ministry.getName())
                .documents(DocumentDto.of(ministry.getDocuments())).build();
        return ministryDocumentDto;
    }
}
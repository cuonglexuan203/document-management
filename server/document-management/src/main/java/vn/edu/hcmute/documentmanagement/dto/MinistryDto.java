package vn.edu.hcmute.documentmanagement.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import vn.edu.hcmute.documentmanagement.model.Ministry;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PRIVATE, force = true)
public class MinistryDto {

    @Builder.Default
    @NotNull
    private List<String> ministries = new ArrayList<>();

    public static MinistryDto of(List<Ministry> ministries){
        return MinistryDto.builder().ministries(ministries.stream().map(Ministry::getName).toList()).build();
    }
}

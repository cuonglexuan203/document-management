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
    @Min(value = 0)
    private long id = 0;
    @NotNull
    private String ministry;

    public static MinistryDto of(Ministry ministry) {
        MinistryDto ministryDto = new MinistryDto().builder()
                .id(ministry.getId())
                .ministry((ministry.getName()))
                .build();
        return ministryDto;
    }

    public static List<MinistryDto> of(List<Ministry> ministries){
        List<MinistryDto> ministryDtos = ministries.stream().map(MinistryDto::of).toList();
        return  ministryDtos;
    }

}

package vn.edu.hcmute.documentmanagement.exception;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DocumentErrorResponse {

    @NotNull
    private String message;

    @Size(min =  100, max = 599)
    private int status;

    @Min(value= 0)
    private long timeStamp;
}

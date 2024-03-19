package vn.edu.hcmute.documentmanagement.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class DocumentExceptionHandler {

    @ExceptionHandler
    public ResponseEntity<DocumentErrorResponse> handleException(ResourceNotFoundException exc){
        DocumentErrorResponse error = new DocumentErrorResponse();
        error.setMessage(exc.getMessage());
        error.setStatus(HttpStatus.NOT_FOUND.value());
        error.setTimeStamp(System.currentTimeMillis());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler
    public ResponseEntity<DocumentErrorResponse> handleException(Exception exc){
        DocumentErrorResponse error = new DocumentErrorResponse();
        error.setMessage(exc.getMessage());
        error.setStatus(HttpStatus.BAD_REQUEST.value());
        error.setTimeStamp(System.currentTimeMillis());
        return ResponseEntity.badRequest().body(error);
    }
}

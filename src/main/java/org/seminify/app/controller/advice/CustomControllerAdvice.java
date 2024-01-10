package org.seminify.app.controller.advice;

import java.util.Map;
import java.util.NoSuchElementException;

import org.seminify.app.util.CustomJWTException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CustomControllerAdvice {
    @ExceptionHandler(NoSuchElementException.class)
    protected ResponseEntity<?> notFound(NoSuchElementException noSuchElementException) {
        var message = noSuchElementException.getMessage();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("MESSAGE", message));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    protected ResponseEntity<?> notAcceptable(MethodArgumentNotValidException methodArgumentNotValidException) {
        var message = methodArgumentNotValidException.getMessage();
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Map.of("MESSAGE", message));
    }

    @ExceptionHandler(CustomJWTException.class)
    protected ResponseEntity<?> error(CustomJWTException customJWTException) {
        var message = customJWTException.getMessage();
        return ResponseEntity.ok(Map.of("error", message));
    }
}

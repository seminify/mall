package org.seminify.app.util;

public class CustomJWTException extends RuntimeException {
    public CustomJWTException(String message) {
        super(message);
    }
}

package org.seminify.app.service;

import org.seminify.app.dto.TodoDTO;

public interface TodoService {
    Long register(TodoDTO todoDTO);
}

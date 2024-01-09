package org.seminify.app.service;

import org.seminify.app.dto.PageRequestDTO;
import org.seminify.app.dto.PageResponseDTO;
import org.seminify.app.dto.TodoDTO;

public interface TodoService {
    Long register(TodoDTO todoDTO);

    PageResponseDTO<TodoDTO> list(PageRequestDTO pageRequestDTO);

    TodoDTO get(Long tno);

    void modify(TodoDTO todoDTO);

    void remove(Long tno);
}

package org.seminify.app.service;

import org.seminify.app.dto.TodoDTO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class TodoServiceImpl implements TodoService {
    @Override
    public Long register(TodoDTO todoDTO) {
        return null;
    }
}

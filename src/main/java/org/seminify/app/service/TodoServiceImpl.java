package org.seminify.app.service;

import org.modelmapper.ModelMapper;
import org.seminify.app.domain.Todo;
import org.seminify.app.dto.TodoDTO;
import org.seminify.app.repository.TodoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TodoServiceImpl implements TodoService {
    private final ModelMapper modelMapper;
    private final TodoRepository todoRepository;

    @Override
    public Long register(TodoDTO todoDTO) {
        var todo = modelMapper.map(todoDTO, Todo.class);
        var savedTodo = todoRepository.save(todo);
        return savedTodo.getTno();
    }

    @Override
    public TodoDTO get(Long tno) {
        var result = todoRepository.findById(tno);
        var todo = result.orElseThrow();
        var dto = modelMapper.map(todo, TodoDTO.class);
        return dto;
    }

    @Override
    public void modify(TodoDTO todoDTO) {
        var result = todoRepository.findById(todoDTO.getTno());
        var todo = result.orElseThrow();
        todo.setTitle(todoDTO.getTitle());
        todo.setComplete(todoDTO.isComplete());
        todo.setDueDate(todoDTO.getDueDate());
        todoRepository.save(todo);
    }

    @Override
    public void remove(Long tno) {
        todoRepository.deleteById(tno);
    }
}

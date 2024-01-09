package org.seminify.app.controller;

import org.seminify.app.dto.PageRequestDTO;
import org.seminify.app.dto.PageResponseDTO;
import org.seminify.app.dto.TodoDTO;
import org.seminify.app.service.TodoService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RequestMapping("api/todo")
@RestController
@RequiredArgsConstructor
@Log4j2
public class TodoController {
    private final TodoService todoService;

    @GetMapping("list")
    public PageResponseDTO<TodoDTO> list(PageRequestDTO pageRequestDTO) {
        log.info(pageRequestDTO);
        return todoService.list(pageRequestDTO);
    }

    @GetMapping("{tno}")
    public TodoDTO get(@PathVariable(name = "tno") Long tno) {
        return todoService.get(tno);
    }
}

package org.seminify.app.controller;

import java.util.Map;

import org.seminify.app.dto.PageRequestDTO;
import org.seminify.app.dto.PageResponseDTO;
import org.seminify.app.dto.TodoDTO;
import org.seminify.app.service.TodoService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @PostMapping
    public Map<String, Long> register(@RequestBody TodoDTO todoDTO) {
        log.info("TodoDTO : " + todoDTO);
        var tno = todoService.register(todoDTO);
        return Map.of("TNO", tno);
    }

    @GetMapping("list")
    public PageResponseDTO<TodoDTO> list(PageRequestDTO pageRequestDTO) {
        log.info(pageRequestDTO);
        return todoService.list(pageRequestDTO);
    }

    @GetMapping("{tno}")
    public TodoDTO get(@PathVariable(name = "tno") Long tno) {
        return todoService.get(tno);
    }

    @PutMapping("{tno}")
    public Map<String, String> modify(@PathVariable(name = "tno") Long tno, @RequestBody TodoDTO todoDTO) {
        todoDTO.setTno(tno);
        log.info("TodoDTO : " + todoDTO);
        todoService.modify(todoDTO);
        return Map.of("RESULT", "SUCCESS");
    }

    @DeleteMapping("{tno}")
    public Map<String, String> remove(@PathVariable(name = "tno") Long tno) {
        log.info("TNO : " + tno);
        todoService.remove(tno);
        return Map.of("RESULT", "SUCCESS");
    }
}

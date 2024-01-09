package org.seminify.app.service;

import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.seminify.app.dto.TodoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class TodoServiceTest {
    @Autowired
    private TodoService todoService;

    @Test
    public void testRegister() {
        var todoDTO = TodoDTO.builder().title("서비스 테스트").writer("tester").dueDate(LocalDate.of(2023, 10, 10)).build();
        var tno = todoService.register(todoDTO);
        log.info("TNO : " + tno);
    }

    @Test
    public void testGet() {
        var tno = 101L;
        var todoDTO = todoService.get(tno);
        log.info(todoDTO);
    }
}

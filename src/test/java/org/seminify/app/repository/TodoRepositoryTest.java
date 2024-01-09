package org.seminify.app.repository;

import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.seminify.app.domain.Todo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class TodoRepositoryTest {
    @Autowired
    private TodoRepository todoRepository;

    @Test
    public void test() {
        log.info(todoRepository);
    }

    @Test
    public void testInsert() {
        for (var i = 1; i <= 100; i++) {
            var todo = Todo.builder().title("Title..." + i).writer("user00").dueDate(LocalDate.of(2023, 12, 31))
                    .build();
            todoRepository.save(todo);
        }
    }

    @Test
    public void testPaging() {
        var pageable = PageRequest.of(0, 10, Sort.by("tno").descending());
        var result = todoRepository.findAll(pageable);
        log.info(result.getTotalElements());
        result.forEach(log::info);
    }

    @Test
    public void testRead() {
        var tno = 33L;
        var result = todoRepository.findById(tno);
        var todo = result.orElseThrow();
        log.info(todo);
    }

    @Test
    public void testModify() {
        var tno = 33L;
        var result = todoRepository.findById(tno);
        var todo = result.orElseThrow();
        todo.setTitle("Modified 33...");
        todo.setComplete(true);
        todo.setDueDate(LocalDate.of(2023, 10, 10));
        todoRepository.save(todo);
    }

    @Test
    public void testDelete() {
        var tno = 1L;
        todoRepository.deleteById(tno);
    }
}

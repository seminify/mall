package org.seminify.app.domain;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "tbl_todo")
@AllArgsConstructor
@Builder
@Getter
@NoArgsConstructor
@ToString
public class Todo {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long tno;
    @Setter
    private String title;
    private String writer;
    @Setter
    private boolean complete;
    @Setter
    private LocalDate dueDate;
}

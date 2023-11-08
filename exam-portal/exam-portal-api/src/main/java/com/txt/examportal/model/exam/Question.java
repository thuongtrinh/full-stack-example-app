package com.txt.examportal.model.exam;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    private Long quesId;
    private String answer;

    @Column(length = 4000)
    private String content;
    private String image;
    private String option1;
    private String option2;
    private String option3;
    private String option4;

    @Column(name="q_id", insertable = false, updatable = false, nullable = false)
    private Long qId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="q_id", nullable = false)
    @JsonIgnore
    private Quiz quiz;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Question question = (Question) o;
        return Objects.equals(quesId, question.quesId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(quesId);
    }
}

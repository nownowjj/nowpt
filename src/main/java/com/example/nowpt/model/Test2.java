package com.example.nowpt.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@Setter
public class Test2 {

    @Id
    private Long testId;

    private String testNm;

}

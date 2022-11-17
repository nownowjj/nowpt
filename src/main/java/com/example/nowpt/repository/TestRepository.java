package com.example.nowpt.repository;

import com.example.nowpt.mvc.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TestRepository extends JpaRepository<Member,Long>, TestCustomRepository {

}

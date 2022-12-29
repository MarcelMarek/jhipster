package org.jhipster.todo.repository;

import org.jhipster.todo.domain.Todo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Todo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {}

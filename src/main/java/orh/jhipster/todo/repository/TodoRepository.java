package orh.jhipster.todo.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import orh.jhipster.todo.domain.Todo;

/**
 * Spring Data JPA repository for the Todo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {}

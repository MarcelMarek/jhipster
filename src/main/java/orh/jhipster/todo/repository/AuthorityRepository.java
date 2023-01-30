package orh.jhipster.todo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import orh.jhipster.todo.domain.Authority;

/**
 * Spring Data JPA repository for the {@link Authority} entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {}

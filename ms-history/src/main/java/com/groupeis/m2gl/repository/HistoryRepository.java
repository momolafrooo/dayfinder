package com.groupeis.m2gl.repository;

import com.groupeis.m2gl.domain.History;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the History entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {}

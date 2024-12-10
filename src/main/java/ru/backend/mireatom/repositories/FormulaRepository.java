package ru.backend.mireatom.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.backend.mireatom.entities.Formula;

import java.util.ArrayList;

@Repository
public interface FormulaRepository extends JpaRepository<Formula, Long> {
    @Query("SELECT f FROM Formula f WHERE f.tags LIKE %:tag%")
    ArrayList<Formula> findByTags(@Param("tag") String tag);
}
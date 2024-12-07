package ru.backend.mireatom.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.backend.mireatom.entities.Formula;
import ru.backend.mireatom.repositories.FormulaRepository;

@Service
@Transactional
public class FormulaService {
    private final FormulaRepository formulaRepository;

    public FormulaService(FormulaRepository formulaRepository) {
        this.formulaRepository = formulaRepository;
    }

    @Transactional
    public void save(Formula formula) {
        formulaRepository.save(formula);
    }
}

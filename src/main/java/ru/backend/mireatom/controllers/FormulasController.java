package ru.backend.mireatom.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.backend.mireatom.entities.Formula;
import ru.backend.mireatom.services.FormulaService;

@RestController
@RequestMapping("/formulas")
public class FormulasController {
    private final FormulaService formulaService;

    public FormulasController(FormulaService formulaService) {
        this.formulaService = formulaService;
    }

    @PostMapping
    public ResponseEntity<HttpStatus> saveFormula(@RequestBody Formula formula){
        formulaService.save(formula);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

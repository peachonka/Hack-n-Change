package ru.backend.mireatom.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.backend.mireatom.entities.Formula;
import ru.backend.mireatom.services.FormulaService;

import java.util.TreeMap;

@RestController
@RequestMapping("/formulas")
public class FormulasController {
    private final FormulaService formulaService;

    public FormulasController(FormulaService formulaService) {
        this.formulaService = formulaService;
    }

    @PostMapping(consumes = "application/json")
    public ResponseEntity<HttpStatus> saveFormula(@RequestBody Formula formula){
        formulaService.save(formula);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(consumes = "text/plain")
    @ResponseBody
    public ResponseEntity<TreeMap<Integer, Formula>> findSimilar(@RequestParam String latex){
        return new ResponseEntity<>(formulaService.findSimilar(latex), HttpStatus.OK);
    }
}

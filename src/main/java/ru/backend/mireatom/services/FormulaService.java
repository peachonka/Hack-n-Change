package ru.backend.mireatom.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.backend.mireatom.entities.Formula;
import ru.backend.mireatom.repositories.FormulaRepository;

import java.util.*;

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

    @Transactional
    public TreeMap<Integer, Formula> findSimilar(String latex) {
        List<Formula> all = formulaRepository.findAll();
        TreeMap<Integer, Formula> result = new TreeMap<>(Comparator.reverseOrder());
        for (Formula formula : all) {
            int similarity = calculateSimilarity(latex.toCharArray(), formula.getLatex().toCharArray());
            if (similarity != 0) {
                result.put(similarity, formula);
            }
        }
        return result;
    }

   @Transactional
   public HashSet<Formula> findByTags(String tags) {
       List<Formula> all = formulaRepository.findAll();
       String[] tagsArr = tags.split(" ");
       HashSet<Formula> result = new HashSet<>();
       for (Formula formula : all) {
           boolean found = true;
           for (String tag : tagsArr) {
               if (!formula.getTags().contains(tag)) {
                   found = false;
                   break;
               }
           }
           if (found) {
               result.add(formula);
           }
       }
       return result;
   }

    public int calculateSimilarity(char[] latex, char[] currentFormula) {
        Arrays.sort(latex);
        Arrays.sort(currentFormula);
        int countSimilar = 0;
        if (latex.length >= currentFormula.length) {
            for (char c : currentFormula) {
                if (Arrays.binarySearch(latex, c) >= 0) {
                    countSimilar++;
                }
            }
            return 100 * countSimilar / latex.length;

        }
        else {
            for (char c : latex) {
                if (Arrays.binarySearch(currentFormula, c) >= 0) {
                    countSimilar++;
                }
            }
            return 100 * countSimilar / currentFormula.length;
        }
    }
}

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
    public TreeMap<Integer, ArrayList<Formula>> findSimilar(Formula formula) {
        List<Formula> all;
        if (formula.getTags().isEmpty()) {
            all = formulaRepository.findAll();
        }
        else all = formulaRepository.findByTags(formula.getTags());
        TreeMap<Integer, ArrayList<Formula>> result = new TreeMap<>(Comparator.reverseOrder());
        for (Formula currentFormula : all) {
            int similarity = calculateSimilarity(formula.getLatex().toCharArray(), currentFormula.getLatex().toCharArray());
            if (similarity != 0) {
                if (result.containsKey(similarity)) {
                    ArrayList<Formula> buf = result.get(similarity);
                    buf.add(currentFormula);
                    result.put(similarity, buf);
                }
                else {
                    ArrayList<Formula> buf = new ArrayList<>();
                    buf.add(currentFormula);
                    result.put(similarity, buf);
                }
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
        if (latex.length >= currentFormula.length) {
            return countCharArraysSimilarity(latex, currentFormula);
        }
        else {
            return countCharArraysSimilarity(currentFormula, latex);
        }
    }

    public int countCharArraysSimilarity(char[] bigger, char[] smaller) {
        int digitsAndSpaces = countDigitsAndSpaces(bigger);
        int countSimilar = 0;
        StringBuilder similarStr = new StringBuilder();
        for (char c : smaller) {
            if (Arrays.binarySearch(bigger, c) >= 0 && !(Character.isDigit(c)) && !(c == ' ')) {
                similarStr.append(c);
                countSimilar++;
            }
        }
        return (100 * countSimilar) / (bigger.length - digitsAndSpaces);
    }

    public int countDigitsAndSpaces (char[] arr) {
        int count = 0;
        for (char c : arr) {
            if (Character.isDigit(c) || c == ' ') {
                count++;
            }
        }
        return count;
    }
}

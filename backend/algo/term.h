#pragma once
#include <vector>
#include <ostream>
#include "normalize.h"

struct Term {
    double coefficient;
    std::vector<int> powers;
    Term(double coefficient, std::vector<int> powers) : coefficient(coefficient), powers(powers) {}

    bool isNumber() const {
        for (int i = 0; i < 26; ++i) {
            if (powers[i] != 0) return false;
        }
        return true;
    }

    std::string toLatexString() const {
        std::string res;
        if (isNumber()) {
            return numToString(coefficient);
        }
        if (coefficient != 1) res += numToString(coefficient);
        for (int i = 0; i < 26; ++i) {
            char letter = 'a' + i;
            int power = powers[i];
            if (power == 0) continue;
            res += letter;
            if (power != 1) res += "^{" + numToString(power) + "}";
        }
        return res;
    }

    // method for cout the term
    friend std::ostream& operator<<(std::ostream& os, const Term& term) {
        bool first = true;
        if (term.coefficient != 1 && term.coefficient != -1) {
            first = false;
            os << term.coefficient;
        }
        if (term.coefficient == -1) {
            os << '-';
        }
        for (int i = 0; i < 26; ++i) {
            char letter = 'a' + i;
            int power = term.powers[i];
            if (power == 0) continue;
            if (first) {
                first = false;
                os << letter;
            } else os << "*" << letter;
            if (power != 1) os << "^" << power;
        }
        return os;
    }
};

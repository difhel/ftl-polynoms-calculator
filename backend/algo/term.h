#pragma once
#include <vector>
#include <ostream>
#include "normalize.h"

struct Term {
    double coefficient;
    std::vector<int> powers;
    Term(double coefficient, std::vector<int> powers) : coefficient(coefficient), powers(powers) {}
    Term(): powers(std::vector<int>(26, 0)) {};

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
        if (coefficient != 1 && coefficient != -1) res += numToString(coefficient);
        if (coefficient == -1) res += '-';
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
        if (term.isNumber()) {
            os << numToString(term.coefficient);
            return os;
        }
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

    Term operator*(const Term& other) const {
        Term result;
        result.coefficient = other.coefficient * coefficient;

        for (int i = 0; i < 26; ++i) {
            result.powers[i] = powers[i] + other.powers[i];
        }
        return result;
    }

    bool operator==(const Term& other) const {
        for (int i = 0; i < 26; ++i) {
            if (powers[i] != other.powers[i]) {
                return false;
            }
        }
        if (coefficient != other.coefficient) {
            return false;
        }
        return true;
    }

    bool operator!=(const Term& other) const {
        return !(*this == other);
    }

    bool equalPowers(const Term& other) const {
        for (int i = 0; i < 26; ++i) {
            if (powers[i] != other.powers[i]) {
                return false;
            }
        }
        return true;
    }

    Term operator+(const Term& other) const {
        if (!equalPowers(other)) {
            throw std::invalid_argument(
                "Polynoms with different powers cannot be added"
            );
        }

        Term result(other);
        result.coefficient += coefficient;

        if (result.coefficient == 0) {
            for (int i = 0; i < 26; ++i) {
                result.powers[i] = 0;
            }
        }

        return result;
    }

    bool comparePowerLiterals(const Term& other) const {
        std::string first;
        std::string second;

        for (int i = 0; i < 26; ++i ) {
            if (powers[i] != 0) {
                first += static_cast<char>(i + 'a');
            }
            if (other.powers[i] != 0) {
                second += static_cast<char>(i + 'a');
            }
        }
        return first < second;
    }

    Term getTheNthDerivative(int n, char target) const {
        Term result;

        int targetIndex = target - 'a';

        for (int i = 0; i < 26; ++i) {
            result.powers[i] = powers[i];                
        }

        result.coefficient = coefficient;

        while (n --> 0) {
            if (powers[targetIndex] == 0) {
                result.coefficient = 0;
                return result;
            }

            result.coefficient *= result.powers[targetIndex];
            result.powers[targetIndex]--;
        }

        return result;
    }

    int sumOfPowers() const {
        size_t result = 0;

        for (int i = 0; i < 26; ++i) {
            result += powers[i];
        }
        
        return result;
    }

    bool operator<(const Term& other) const {
        int sum = sumOfPowers() - other.sumOfPowers();        
        if (sum == 0) {
            return comparePowerLiterals(other);
        }

        return sum > 0;
    }
};

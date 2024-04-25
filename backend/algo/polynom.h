#pragma once
#include <ostream>
#include "linked_list.h"
#include "term.h"

class Polynom {
    LinkedList<Term> terms_;
    void normalize_() {
        terms_.sort();
        // remove zeros
        LinkedList<Term> new_terms;
        for (int i = 0; i < terms_.size(); ++i) {
            if (terms_[i].coefficient == 0) continue;
            new_terms.push(terms_[i]);
        }
        terms_ = new_terms;
        // merge terms with the same powers
        LinkedList<Term> merged_terms;
        for (int i = 0; i < terms_.size(); ++i) {
            if (merged_terms.empty()) {
                merged_terms.push(terms_[i]);
                continue;
            }
            Term& last = merged_terms[merged_terms.size() - 1];
            if (last.powers == terms_[i].powers) {
                last.coefficient += terms_[i].coefficient;
            } else {
                merged_terms.push(terms_[i]);
            }
        }
        terms_ = merged_terms;
    }
    public:
        Polynom() = default;
        // Polynom(const Polynom& other) = default;
        // Polynom(Polynom&& other) = default;
        std::string toLatexString() const {
            std::string res;
            for (int i = 0; i < terms_.size(); ++i) {
                if (terms_[i].coefficient > 0 && i != 0) {
                    res += " + ";
                }
                res += terms_[i].toLatexString();
            }
            return res;
        }
        void addTerm(const Term& term) {
            if (term.coefficient == 0) return;
            terms_.push(term);
        }
        friend std::ostream& operator<<(
            std::ostream& os,
            const Polynom& polynom
        ) {
            bool first = true;
            for (int i = 0; i < polynom.terms_.size(); ++i) {
                const Term& term = polynom.terms_[i];
                if (term.coefficient == 0) continue;
                if (term.coefficient < 0) {
                    os << term;
                }
                if (term.coefficient > 0) {
                    if (!first) {
                        os << " + ";
                    }
                    os << term;
                }
                first = false;
            }
            return os;
        }

        Polynom getTheNthDerivative(int n, char target) const {
            Polynom result;

            result.terms_ = terms_;

            for (int i = 0; i < terms_.size(); ++i) {
                result.terms_[i] = terms_[i].getTheNthDerivative(n, target);
            }

            result.normalize_();
            return result;
        }

        bool operator==(const Polynom& other) const {
            if (terms_.size() != other.terms_.size()) {
                return false;
            }
            for (int i = 0; i < terms_.size(); ++i) {
                if (terms_[i] != other.terms_[i]) {
                    return false;
                }
            }
            return true;
        }

        Polynom operator+(const Polynom& other) const {
            Polynom result;

            for (int i = 0; i < terms_.size(); ++i) {
                result.terms_.push(terms_[i]);
            }

            for (int i = 0; i < other.terms_.size(); ++i) {
                result.terms_.push(other.terms_[i]);
            }

            result.normalize_();
            return result;
        }

        Polynom operator*(const Term& other) const {
            Polynom result;

            for (int i = 0; i < terms_.size(); ++i) {
                result.terms_.push(terms_[i] * other);
            }

            result.normalize_();
            return result;
        }

        Polynom operator*(const Polynom& other) const {
            Polynom result;

            for (int i = 0; i < other.terms_.size(); ++i) {
                result = result + operator*(other.terms_[i]);
            }
            result.normalize_();
            return result;
        }
};

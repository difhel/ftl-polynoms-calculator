#pragma once
#include <ostream>
#include "linked_list.h"
#include "term.h"

class Polynom {
    LinkedList<Term> terms_;
    public:
        Polynom() = default;
        Polynom(const Polynom& other) = default;
        Polynom(Polynom&& other) = default;
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
};

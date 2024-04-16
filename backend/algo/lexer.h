#pragma once
#include <string>
#include <optional>
#include <vector>
#include "term.h"
#include "polynom.h"

template<typename K>
struct LexerReturnType {
    std::optional<K> value;
    std::string::iterator end; // symbol after the lexeme
    LexerReturnType(std::optional<K> value, std::string::iterator end): value(value), end(end) {}
};

LexerReturnType<int> lexUnsignedInt(std::string::iterator begin, std::string::iterator end) {
    std::string::iterator it = begin;
    while (it != end && std::isdigit(*it)) {
        ++it;
    }
    if (it == begin) {
        return LexerReturnType<int>(std::nullopt, begin);
    }
    return LexerReturnType<int>(std::stoi(std::string(begin, it)), it);
}

LexerReturnType<int> lexInt(std::string::iterator begin, std::string::iterator end) {
    if (begin == end) {
        return LexerReturnType<int>(std::nullopt, begin);
    }
    if (*begin == '-') {
        LexerReturnType<int> res = lexUnsignedInt(begin + 1, end);
        if (res.value) {
            res.value = -res.value.value();
        }
        return res;
    }
    if (*begin == '+') {
        return lexUnsignedInt(begin + 1, end);
    }
    return lexUnsignedInt(begin, end);
}

LexerReturnType<char> lexLetter(std::string::iterator begin, std::string::iterator end) {
    if (begin == end || !std::isalpha(*begin)) {
        return LexerReturnType<char>(std::nullopt, begin);
    }
    return LexerReturnType<char>(*begin, begin + 1);
}

LexerReturnType<bool> lexSign(std::string::iterator begin, std::string::iterator end) {
    if (begin == end) {
        return LexerReturnType<bool>(std::nullopt, begin);
    }
    if (*begin == '+' || *begin == '-') {
        return LexerReturnType<bool>(*begin == '-', begin + 1);
    }
    return LexerReturnType<bool>(std::nullopt, begin);
}

LexerReturnType<int> lexPower(std::string::iterator begin, std::string::iterator end) {
    if (begin == end || *begin != '^') {
        return LexerReturnType<int>(std::nullopt, begin);
    }
    return lexInt(begin + 1, end);
}

LexerReturnType<Term> lexTerm(std::string::iterator begin, std::string::iterator end) {
    bool isEmpty = true;

    // read term coefficient
    int coefficient = 1;
    auto coefficientRes = lexInt(begin, end);
    if (coefficientRes.value) {
        coefficient = coefficientRes.value.value();
        begin = coefficientRes.end;
        isEmpty = false;
    }

    // read term variables & its powers
    std::vector<int> powers(26, 0);
    while (begin != end) {
        // try to read end of the term
        if (lexSign(begin, end).value) {
            // EOT
            if (isEmpty) {
                throw std::invalid_argument(
                    std::string("SyntaxError: expected term at token '") + *begin + "', but read EndOfTerm"
                );
            }
            break;
        }

        // try to read valid term
        auto coefficientRes = lexUnsignedInt(begin, end);
        if (coefficientRes.value) {
            coefficient *= coefficientRes.value.value();
            begin = coefficientRes.end;
        }
        auto letterRes = lexLetter(begin, end);
        if (!letterRes.value) {
            break;
        }
        int letter = letterRes.value.value() - 'a';
        begin = letterRes.end;
        auto powerRes = lexPower(begin, end);
        if (powerRes.value) {
            powers[letter] = powerRes.value.value();
            begin = powerRes.end;
        } else {
            powers[letter] = 1;
        }
        isEmpty = false;
    }
    if (isEmpty) throw std::invalid_argument("SyntaxError: expected term, but got nothing");
    Term term(coefficient, powers);
    return LexerReturnType<Term>(term, begin);
}

LexerReturnType<Polynom> lexPolynom(std::string::iterator begin, std::string::iterator end) {
    Polynom polynom;
    bool first = true;
    while (begin != end) {
        int coefficient = 1;
        auto signRes = lexSign(begin, end);
        if (signRes.value) {
            if (signRes.value.value()) {
                coefficient = -1;
            }
            begin = signRes.end;
        } else if (!first) {
            throw std::invalid_argument(
                std::string("SyntaxError: expected '+' or '-' at token '") + *begin + "'"
            );
        }
        auto termRes = lexTerm(begin, end);
        if (!termRes.value) {
            throw std::invalid_argument(
                std::string("SyntaxError: failed to parse term at token '") + *begin + "'"
            );
        }
        auto term = termRes.value.value();
        term.coefficient *= coefficient;
        polynom.addTerm(term);
        begin = termRes.end;
        first = false;
    }
    return LexerReturnType<Polynom>(polynom, begin);
}
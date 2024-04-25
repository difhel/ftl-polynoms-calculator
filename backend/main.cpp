#include "algo/lexer.h"
#include <iostream>

int main() {
    std::string s = "x^2+2x+3";
    std::string s2 = "5xz";
    LexerReturnType<Polynom> res1 = lexPolynom(s.begin(), s.end());
    LexerReturnType<Polynom> res2 = lexPolynom(s2.begin(), s2.end());
    std::cout << res1.value.value() * res2.value.value() << std::endl;
    // std::string s;
    // std::cout << "Enter the polynom: ";
    // std::cin >> s;
    // LexerReturnType<Polynom> res = lexPolynom(s.begin(), s.end());
    // int n;
    // std::cout << "Enter the number of derivative: ";
    // std::cin >> n;
    // if (res.value) {
    //     auto v = res.value.value();
    //     std::cout << v.toLatexString() << std::endl;
    //     std::cout << v.getTheNthDerivative(n, 'x') << std::endl;
    // } else {
    //     std::cout << "Error" << std::endl;
    // }
}

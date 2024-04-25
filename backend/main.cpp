#include "algo/lexer.h"
#include <iostream>

int main() {
    std::string s;
    std::cout << "Enter the polynom: ";
    std::cin >> s;
    LexerReturnType<Polynom> res = lexPolynom(s.begin(), s.end());
    int n;
    std::cout << "Enter the number of derivative: ";
    std::cin >> n;
    if (res.value) {
        auto v = res.value.value();
        std::cout << v.toLatexString() << std::endl;
        std::cout << v.getTheNthDerivative(n, 'x') << std::endl;
    } else {
        std::cout << "Error" << std::endl;
    }
}

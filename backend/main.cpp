#include "algo/lexer.h"
#include <iostream>

int main() {
    std::string s;
    std::cout << "Enter the polynom: ";
    std::cin >> s;
    LexerReturnType<Polynom> res = lexPolynom(s.begin(), s.end());
    if (res.value) {
        std::cout << res.value.value() << std::endl;
    } else {
        std::cout << "Error" << std::endl;
    }
}

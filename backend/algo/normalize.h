#pragma once
#include <string>

std::string numToString(double value) {
    if (value == 0) return "0";
    std::string res = std::to_string(value);
    while (!res.empty() && (res.back() == '0' || res.back() == '.')) {
        if (res.back() == '.') {
            res.pop_back();
            break;
        }
        res.pop_back();
    }
    return res;
}

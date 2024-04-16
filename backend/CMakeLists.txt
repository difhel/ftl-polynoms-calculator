# Specify the minimum version for CMake
cmake_minimum_required(VERSION 3.10)

# Project's name
project(Polynoms)

# Set the C++ standard
set(CMAKE_CXX_STANDARD 17)

# Add the executable
add_executable(
    Polynoms
    algo/lexer.h
    algo/term.h
    algo/normalize.h
    algo/linked_list.h
    algo/polynom.h
    main.cpp
)


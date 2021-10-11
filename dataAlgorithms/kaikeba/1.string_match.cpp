/*************************************************************************
	> File Name: 1.string_match.cpp
	> Author: huguang
	> Mail: hug@haizeix.com
	> Created Time: 
 ************************************************************************/

#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <queue>
#include <stack>
#include <algorithm>
#include <string>
#include <map>
#include <set>
#include <vector>
using namespace std;

int brute_force(const char *text, const char *pattern) {
    for (int i = 0; text[i]; ++i) {
        int flag = 1;
        for (int j = 0; pattern[j]; ++j) {
            if (text[i + j] == pattern[j]) continue;
            flag = 0;
            break;
        }
        if (flag) return i;
    }
    return -1;
}

#define TEST(func, s1, s2) { \
    printf("%s(\"%s\", \"%s\") = %d\n", #func, s1, s2, func(s1, s2)); \
}

int main() {
    char s1[100], s2[100];
    while (cin >> s1 >> s2) {
        TEST(brute_force, s1, s2);
    }
    return 0;
}

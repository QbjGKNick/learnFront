/*************************************************************************
	> File Name: 2.HZOJ-263.cpp
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

bool check(int *a, int n) {
    for (int s[25] = {0}, top = -1, y = 1, i = 0; i < n; i++) {
        while (y <= a[i]) s[++top] = (y++);
        if (s[top] != a[i]) return false;
        --top;
    }
    return true;
}

int main() {
    int n;
    cin >> n;
    int a[25], total = 20;
    for (int i = 0; i < n; i++) a[i] = i + 1;
    do {
        if (check(a, n)) {
            for (int i = 0; i < n; i++) cout << a[i];
            cout << endl;
            total -= 1;
        }
    } while (total && next_permutation(a, a + n));
    return 0;
}

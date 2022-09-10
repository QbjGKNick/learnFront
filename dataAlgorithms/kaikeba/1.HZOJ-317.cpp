/*************************************************************************
	> File Name: 1.HZOJ-317.cpp
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
#include <unordered_set>
using namespace std;

long long gcd(long long a, long long b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}

long long phi(long long n) {
    long long i = 2, x = n;
    while (i * i <= x) {
        if (x % i == 0) n -= (n / i);
        while (x % i == 0) x /= i;
        i += 1;
    }
    if (x != 1) n -= (n / x);
    return n;
}

long long quick_mul(long long a, long long b, long long c) {
    long long ans = 0, temp = a;
    while (b) {
        if (b & 1) ans = (ans + temp) % c;
        temp = (temp + temp) % c;
        b >>= 1;
    }
    return ans;
}

long long quick_mod(long long a, long long b, long long c) {
    long long ans = 1, temp = a;
    while (b) {
        if (b & 1) ans = quick_mul(ans, temp, c);
        temp = quick_mul(temp, temp, c);
        b >>= 1;
    }
    return ans;
}

set<long long> getSet(long long x) {
    long long i = 2;
    set<long long> h, temp;
    h.insert(1);
    while (i * i <= x) {
        while (x % i == 0) {
            temp.clear();
            for (auto y : h) temp.insert(y * i);
            for (auto y : temp) h.insert(y);
            x /= i;
        }
        i += 1;
    }
    if (x != 1) {
        temp.clear();
        for (auto y : h) temp.insert(y * x);
        for (auto y : temp) h.insert(y);
    }
    return h;
}

int main() {
    long long n, x;
    cin >> n;
    n *= 9;
    n /= gcd(n, 8);
    if (gcd(n, 10) != 1) {
        printf("0\n");
        return 0;
    }
    x = phi(n);
    auto x_set = getSet(x);
    for (auto i : x_set) {
        if (x % i) continue;
        if (quick_mod(10, i, n) != 1) continue;
        cout << i << endl;
        break;
    }
    return 0;
}

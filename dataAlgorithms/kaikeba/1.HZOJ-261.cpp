/*************************************************************************
	> File Name: 1.HZOJ-261.cpp
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
#include <cinttypes>
using namespace std;
#define MAX_N 1000
long long sum[MAX_N + 5], qans[MAX_N + 5];

int main() {
    long long n, x, m;
    cin >> n;
    string op;
    stack<long long> sl, sr;
    sum[0] = 0;
    qans[0] = INT64_MIN;
    for (long long i = 0; i < n; i++) {
        cin >> op;
        switch (op[0]) {
            case 'I': {
                cin >> x;
                sl.push(x);
                m = sl.size();
                sum[m] = x + sum[m - 1];
                qans[m] = max(sum[m], qans[m - 1]);
            } break;
            case 'D': {
                if (sl.size()) sl.pop();
            } break;
            case 'L': {
                if (sl.size()) sr.push(sl.top()), sl.pop();
            } break;
            case 'R': {
                if (sr.size() == 0) break;
                x = sr.top();
                sl.push(x), sr.pop();
                m = sl.size();
                sum[m] = x + sum[m - 1];
                qans[m] = max(sum[m], qans[m - 1]);
            } break;
            case 'Q': {
                cin >> x;
                cout << qans[x] << endl;
            } break;
        }
    }
    return 0;
}

/*************************************************************************
	> File Name: 4.HZOJ-595.cpp
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

int main() {
    int n;
    cin >> n;
    vector<string> ops(n);
    for (int i = 0; i < n; i++) cin >> ops[i];
    string t;
    cin >> t;
    stack<string> s;
    bool flag = false;
    for (int i = 0; i < n; i++) {
        if (ops[i] == "return") s.pop();
        else s.push(ops[i]);
        if ((flag = (ops[i] == t))) break;
    }
    if (flag == false) {
        cout << "NOT REFERENCED" << endl;
        return 0;
    }
    n = s.size();
    while (s.size()) {
        ops[s.size() - 1] = s.top();
        s.pop();
    }
    for (int i = 0; i < n; i++) {
        cout << ops[i];
        if (i + 1 < n) cout << "->";
    }
    cout << endl;
    return 0;
}

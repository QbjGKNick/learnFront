/*************************************************************************
	> File Name: 3.HZOJ-265.cpp
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
    string t;
    cin >> t;
    vector<int> pos(t.size(), -1);
    stack<int> s;
    int temp_ans = 0, ans = 0;
    for (int i = 0; t[i]; i++) {
        switch (t[i]) {
            case '(':
            case '[':
            case '{': s.push(i); break;
            case ')':
            case ']':
            case '}': {
                if (s.empty()) { s.push(i); break; }
                if ((t[s.top()] == '(' && t[i] == ')') || 
                   (t[s.top()] == '[' && t[i] == ']') ||
                    (t[s.top()] == '{' && t[i] == '}')
                ) {
                    pos[s.top()] = i;
                    s.pop();
                } else {
                    s.push(i);
                }
            } break;
        }
    }
    for (int i = 0; t[i];) {
        if (pos[i] == -1) temp_ans = 0, i += 1;
        else {
            temp_ans += (pos[i] - i + 1);
            i = pos[i] + 1;
        }
        ans = max(ans, temp_ans);
    }
    cout << ans << endl;
    return 0;
}

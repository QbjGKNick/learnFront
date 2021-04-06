/*************************************************************************
	> File Name: main.cpp
	> Author: hug
	> Mail:   hug@haizeix.com
	> Created Time: 二  3/17 18:55:01 2020
 ************************************************************************/

#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <algorithm>
#include <vector>
#include <map>
#include <cmath>
#include <queue>
#include "thread_pool.h"
using namespace std;

void func(int x, int &n) {
    n += 2;
    cout << "func : " << x << " " << n << endl;
}

int main() {
    int n = 123;
    haizei::Task t(func, 23, ref(n));
    t.run();
    cout << n << endl;
    haizei::thread_pool tp(2);
    tp.start();
    for (int i = 0; i < 10; i++) {
        tp.add_one_task(func, i, ref(n));
    }
    cout << "add task done" << endl;
    std::this_thread::sleep_for(std::chrono::seconds(2));
    cout << "tp stop" << endl;
    tp.stop();
    return 0;
}

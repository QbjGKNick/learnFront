/*************************************************************************
	> File Name: 6.skiplist.cpp
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
#include <unordered_map>
using namespace std;

class Node {
public :
    Node(int data = 0, Node *next = nullptr, Node *down = nullptr) 
    : data(data), next(next), down(down) {}
    void insert(Node *p) {
        p->next = next;
        next = p;
        return ;
    }

    int data;
    Node *next, *down;
};

class SkipList {
public :
    SkipList(int max_level = 32) 
    : max_level(max_level), n(0), head(max_level), tail(max_level) {
        for (int i = max_level - 1; i >= 0; i--) {
            head[i].data = INT32_MIN;
            tail[i].data = INT32_MAX;
            head[i].next = &tail[i];
            if (i == 0) break;
            head[i].down = &head[i - 1];
            tail[i].down = &tail[i - 1];
        }
        return ;
    }
    bool find(int x) {
        if (n == 0) return false;
        Node *p = &head[n - 1];
        while (p) {
            if (p->next->data == x) return true;
            if (p->next->data < x) p = p->next;
            else p = p->down;
        }
        return false;
    }
    bool insert(int x) {
        if (find(x)) return false;
        int level = randLevel();
        Node *node = getNewNode(level, x), *p = &head[level - 1];
        for (int i = 0; i < level; i++) {
            while (p->next->data < x) p = p->next;
            p->insert(node);
            p = p->down;
            node = node->down;
        }
        n = max(n, level);
        return true;
    }
    void output() {
        printf("SkipList (level = %d) : \n", n);
        if (n == 0) {
            printf("NULL\n");
            return ;
        }
        unordered_map<int, int> pos;
        Node *p = &head[0];
        int len = 0;
        char buff[100];
        while (p) {
            pos[p->data] = len;
            len += sprintf(buff, "%3d", p->data);
            len += sprintf(buff, " -> ");
            p = p->next;
        }
        for (int i = n - 1, len = 0; i >= 0; i--) {
            Node *p = &head[i];
            len = 0;
            while (p) {
                while (len < pos[p->data]) len += printf(" ");
                len += printf("%3d -> ", p->data);
                p = p->next;
            }
            printf("nullptr\n");
        }
        return ;
    }

private:
    Node *getNewNode(int n, int x) {
        vector<Node> *nodes = new vector<Node>(n, x);
        for (int i = 1; i < n; i++) {
            (*nodes)[i].down = &(*nodes)[i - 1];
        }
        return &(*nodes)[n - 1];
    }
    int randLevel() {
        double p = 1.0 / 2.0;
        int level = 0;
        while (randDouble() < p) level += 1;
        return min(level + 1, max_level);
    }
    double randDouble() {
        #define MAX_N 100000000LL
        return (rand() % MAX_N) * 1.0 / MAX_N;
        #undef MAX_N
    }
    int max_level, n;
    vector<Node> head, tail;
};

int main() {
    int x;
    SkipList list;
    while (cin >> x) {
        list.insert(x);
        list.output();
    }
    return 0;
}

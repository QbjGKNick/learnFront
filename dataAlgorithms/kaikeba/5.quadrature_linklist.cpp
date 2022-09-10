/*************************************************************************
	> File Name: 5.quadrature_linklist.cpp
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

class Node {
public :
    Node(
        int data = 0, int i = 0, int j = 0,
        Node *row_next = nullptr,
        Node *col_next = nullptr
    ) : data(data), i(i), j(j), row_next(row_next), col_next(col_next) {};
    
    void insert_row(Node *p) {
        p->row_next = row_next;
        row_next = p;
        return ;
    }
    void insert_col(Node *p) {
        p->col_next = col_next;
        col_next = p;
        return ;
    }

    int data, i, j;
    Node *row_next, *col_next;
};

class Linklist {
public :
    Linklist(int n, int m) : n(n), m(m), row_head(n), col_head(m) {}
    Node *find(int i, int j) {
        Node *p = row_head[i].row_next;
        while (p && p->j < j) p = p->row_next;
        if (p && p->j == j) return p;
        return nullptr;
    }
    Node *insert(int i, int j, int x) {
        if (find(i, j) != nullptr) return nullptr;
        if (i >= n || i < 0) return nullptr;
        if (j >= m || j < 0) return nullptr;
        Node *p = new Node(x, i, j);
        insert_row(&row_head[i], j, p);
        insert_col(&col_head[j], i, p);
        return p;
    }
    void output_row() {
        cout << endl;
        cout << "Quadrature Linklist (row output) : " << n << " * " << m << endl;
        cout << "==================" << endl;
        for (int i = 0; i < n; i++) {
            cout << "Line " << i << " : ";
            Node *p = row_head[i].row_next;
            while (p) {
                cout << "(" << p->data << " | " << p->i << ", " << p->j << "), ";
                p = p->row_next;
            }
            cout << endl;
        }
        return ;
    }
    
    void output_col() {
        cout << endl;
        cout << "Quadrature Linklist (col output): " << n << " * " << m << endl;
        cout << "==================" << endl;
        for (int j = 0; j < m; j++) {
            cout << "Col " << j << " : ";
            Node *p = col_head[j].col_next;
            while (p) {
                cout << "(" << p->data << " | " << p->i << ", " << p->j << "), ";
                p = p->col_next;
            }
            cout << endl;
        }
        return ;
    }

private:
    int n, m;
    vector<Node> row_head, col_head;
    void insert_row(Node *head, int pos, Node *node) {
        while (head->row_next && head->row_next->j < pos) head = head->row_next;
        head->insert_row(node);
        return ;
    }
    void insert_col(Node *head, int pos, Node *node) {
        while (head->col_next && head->col_next->i < pos) head = head->col_next;
        head->insert_col(node);
        return ;
    }
};

int main() {
    int i, j, x;
    Linklist list(10, 10);
    while (cin >> i >> j >> x) {
        list.insert(i, j, x);
        list.output_row();
        list.output_col();
    }
    return 0;
}

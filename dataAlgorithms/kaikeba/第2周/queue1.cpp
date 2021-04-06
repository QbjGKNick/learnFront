/*************************************************************************
	> File Name: queue1.cpp
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
    int val;
    Node *next, *pre;
    Node(int val = 0, Node *next = nullptr, Node *pre = nullptr) : val(val), next(next), pre(pre) {}
    void insert_pre(Node *p) {
        p->pre = pre;
        p->next = this;
        if (this->pre) this->pre->next = p;
        this->pre = p;
        return ;
    }
    void insert_next(Node *p) {
        p->pre = this;
        p->next = this->next;
        if (this->next) this->next->pre = p;
        this->next = p;
        return ;
    }
    void delete_pre() {
        if (this->pre == nullptr) return ; 
        Node *p = this->pre;
        this->pre = p->pre;
        if (p->pre) p->pre->next = this;
        delete p;
        return ;
    }
    void delete_next() {
        if (this->next == nullptr) return ;
        Node *p = this->next;
        this->next = p->next;
        if (p->next) p->next->pre = this;
        delete p;
        return ;
    }
};

class Queue {
public :
    Node head, tail;
    int cnt;
    Queue() : cnt(0) {
        head.next = &tail;
        head.pre = nullptr;
        tail.next = nullptr;
        tail.pre = &head;
    }
    void push_back(int val) {
        tail.insert_pre(new Node(val));
        cnt += 1;
        return ;
    }
    void push_front(int val) {
        head.insert_next(new Node(val));
        cnt += 1;
        return ;
    }
    int pop_back() {
        if (isEmpty()) return -1;
        int ret = tail.pre->val;
        tail.delete_pre();
        cnt -= 1;
        return ret;
    }
    int pop_front() {
        if (isEmpty()) return -1;
        int ret = head.next->val;
        head.delete_next();
        cnt -= 1;
        return ret;
    }
    int front() {
        return head.next->val;
    }
    int back() {
        return tail.pre->val;
    }
    bool isEmpty() {
        return head.next == &tail;
    }
    int size() {
        return cnt;
    }
};

class FrontMiddleBackQueue {
public:
    Queue q1, q2;
    FrontMiddleBackQueue() {}
    
    void pushFront(int val) {
        q1.push_front(val);
        update();
        return ;
    }
    
    void pushMiddle(int val) {
        if (q1.size() > q2.size()) {
            q2.push_front(q1.back());
            q1.pop_back();
        }
        q1.push_back(val);
        return ;
    }
    
    void pushBack(int val) {
        q2.push_back(val);
        update();
        return ;
    }
    
    int popFront() {
        if (isEmpty()) return -1;
        int ret = q1.pop_front();
        update();
        return ret;
    }
    
    int popMiddle() {
        if (isEmpty()) return -1;
        int ret = q1.pop_back();
        update();
        return ret;
    }
    
    int popBack() {
        if (isEmpty()) return -1;
        int ret = q2.pop_back();
        update();
        return ret;
    }
    bool isEmpty() {
        return q1.size() == 0;
    }
    void update() {
        if (q1.size() < q2.size()) {
            q1.push_back(q2.front());
            q2.pop_front();
        }
        if (q1.size() == q2.size() + 2) {
            q2.push_front(q1.back());
            q1.pop_back();
        }
        return ;
    }
};

/**
 * Your FrontMiddleBackQueue object will be instantiated and called as such:
 * FrontMiddleBackQueue* obj = new FrontMiddleBackQueue();
 * obj->pushFront(val);
 * obj->pushMiddle(val);
 * obj->pushBack(val);
 * int param_4 = obj->popFront();
 * int param_5 = obj->popMiddle();
 * int param_6 = obj->popBack();
 */

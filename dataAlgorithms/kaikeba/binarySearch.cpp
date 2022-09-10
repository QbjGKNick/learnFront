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


int binarySearch_1(vector<int> &nums, int target) {
    int l = 0, r = nums.size() - 1, mid = 0;
    
    while(l <= r) { // 1!!!
        // mid = (l + r) / 2;
        mid = l + (r - l) / 2; // 2!!!
        if(nums[mid] == target) {
            return mid;
        } else if(nums[mid] > target) {
            r = mid - 1; // 3 !!!
        } else {
            l = mid + 1; // 3 !!!
        }
    }
    return -1;
}


int binarySearch(vector<int> &nums, int target) {
    int l = 0, r = nums.size() - 1, mid = 0;
    
    while(l <= r) { 
        mid = l + (r - l) / 2;
        if(nums[mid] == target) {
            r = mid - 1; // r 指向的元素永远不可能等于target
        } else if(nums[mid] > target) {
            r = mid - 1; 
        } else {
            l = mid + 1;
        }
    }
    cout << "l : " << l << endl; // 当元素不存在, l指向第一个大于target的值
    cout << "r : " << r << endl; // 当元素不存在, r指向最后一个小于target的值
    return l;
}


int main() {
    vector<int> nums{0, 0, 0, 0, 6, 6, 6};
    int idx = binarySearch(nums, 6 + 1);
    cout << "last target : " << idx - 1 << endl;
    return 0;
}














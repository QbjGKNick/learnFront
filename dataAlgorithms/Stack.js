class Stack {
    constructor() {
        this.data = []
    }

    push(a) {
        this.data.push(a)
    }

    pop() {
        if(this.empty()) return;
        this.data.shift()
    }

    empty() {
        return this.data.length === 0
    }

    size() {
        return this.data.length
    }
}
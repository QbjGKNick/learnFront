function Fn() {
    this.x = 100
    this.y = 200
    this.getX = function () {
        console.log(this.x)
    }
}
Fn.prototype.getX = function () {
    console.log(this.x)
}
Fn.prototype.getY = function () {
    console.log(this.y)
}
let f1 = new Fn
let f2 = new Fn
console.log(f1.getX === f2.getX)
console.log(f1.getY === f2.getY)
console.log(f1.__proto__.getY === Fn.prototype.getY)
console.log(f1.__proto__.getX === f2.getX)
console.log(f1.getX === Fn.prototype.getX)
console.log(f1.constructor)
console.log(Fn.prototype.__proto__.constructor)
f1.getX()
f1.__proto__.getX()
f2.getY()
Fn.prototype.getY()
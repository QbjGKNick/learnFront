function Father() {
    this.getName = function () { console.log('111') }

    return this;
}
Father.getName = function () { console.log('222') }
Father.prototype.getName = function () { console.log('333') }
var getName = function () { console.log('444') }
function getName() { console.log('555') }

Father.getName() //222

getName()     //444

new Father.getName() //222

new Father().getName() //333

new new Father().getName() //?
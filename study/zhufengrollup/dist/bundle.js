'use strict';

const name = 'name';
const age = 'age';

const home = 'home';

function say(){            
    console.log('say');
}
say();//访问say方法,会按照作用域链的规则向找此变量的定义
console.log(home);
console.log(name);
console.log(age);

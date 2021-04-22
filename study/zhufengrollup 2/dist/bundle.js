'use strict';

function getName(){
    let age = 10;
    return function getAge(){
        console.log(age);
    }
}
let getAge = getName();
getAge();

"use strict";
function sum(user1, user2) {
    return user1.age + user2.age;
}
console.log(sum({ name: "taro", age: 21 }, { name: "paro", age: 24 }));

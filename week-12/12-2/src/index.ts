interface User{
    name:string;
    age:number;
}

function sum(user1:User,user2:User){
    return user1.age+user2.age
}



console.log(sum({name:"taro",age:21},{name:"paro",age:24}))
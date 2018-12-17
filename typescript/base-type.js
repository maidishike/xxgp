/**
 * typescript基础数据类型
 * 布尔值、数字、字符串、结构体
**/
// 布尔值
var isDone = false;
// 数字
var decNumber = 6;
// 字符串
var username = "bob";
var sentence = "Hello, My name is " + username;
console.log(sentence);
// 数组
var list = [1, 2, 3];
var list2 = [1, 2, 3];
// 元组Tuple
var tuple;
tuple = ['hello', 10];
// tuple = [10, 'hello'] // Eroor: Type 'string' is not assignable to type 'number'
// tuple[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型
// console.log(tuple[5].toString()); // OK, 'string' 和 'number' 都有 toString
// 枚举
// enum Color {Red, Green, Blue};
// let c:Color = Color.Green;
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 3] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
console.log(c);
// Any
var notSure = 4;
console.log(typeof notSure);
var anyList = [1, true, 'free'];
anyList[1] = 100;
console.log(anyList);
// Void void类型的变量没有什么大用，因为你只能为它赋予undefined和null
var unusabel = undefined;
var unusabelNull = null;
// Null 和 Undefined
var u = undefined;
var n = null;
// Never never类型表示的是那些永不存在的值的类型
// 返回never的函数必须存在无法达到的终点
function error(message) {
    throw new Error(message);
}
// 推断的返回值类型为never
function fail() {
    return error('Something Error');
}
// 返回never的函数必须存在无法达到的终点
function infiniteLoop() {
    while (true) {
    }
}
create({ prop: 0 }); // OK
create(null); // OK

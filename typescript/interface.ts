/**
 * typescript 接口
 * 布尔值、数字、字符串、结构体
**/

interface LabelledValue{
    label: string;
}
function printLabel(labelledObj: LabelledValue){
    console.log(labelledObj.label);
}
let myObj = {size: 10, label: 'Size 10 Object'};
printLabel(myObj);

// 可选属性
interface SquareConfig {
    color
}

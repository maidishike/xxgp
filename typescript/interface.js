/**
 * typescript 接口
 * 布尔值、数字、字符串、结构体
**/
function printLabel(labelledObj) {
    console.log(labelledObj.label);
}
var myObj = { size: 10, label: 'Size 10 Object' };
printLabel(myObj);

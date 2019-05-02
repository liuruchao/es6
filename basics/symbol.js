// 1.为什么设计Symbol?
// es5的属性名都是字符串，如果想要为他人提供的对象添加一个方法，但新名字和旧名字
// 可能会发生冲突，因此想要保证名字独一无二，这就是引入Symbol原因

{
    // Symbol是ES6引入的新的数据类型，这样js共有七种数据类型，分别是：undefined、Null、String、Number、Boolean、Object、Symbol
    let s = Symbol();
    console.log(typeof s);   //symbol

    // Symbol值通过Symbol函数生成，可以接受字符串为参数，表示对该Symbol实例的描述，如果添加对象作为参数，则会先调用toString,转为字符串
    let s1 = Symbol('foo');
    let s2 = Symbol('bar');
    console.log(s1);  //Symbol(foo)

    console.log(s2.toString())  //"Symbol(bar)"
    
    // 每个Symbol值都是不相等的，就算它们的参数相同
    s1 === s2 // false

    // Symbol可以显示转为字符串和布尔值，不能转为数值
    let s3 = Symbol('str');
    String(s3);
    s3.toString();

    Boolean(s3);   //true
}
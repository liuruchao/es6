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

// 2.Symbol.prototype.description 添加描述,之前读取描述，只能显示的转为字符串，ES2019提供实例属性description,直接返回描述
{
    const s = Symbol('description');

    console.log(String(s));     //Symbol(description)
    console.log(s.toString());  //Symbol(description)

    console.log(s.description)   //'description'
}

//3.作为属性名Symbol
{
    let s = Symbol();

    // 写法1
    let a1 = {};
    a1[s] = 'hello symbol';
    // 写法二
    let a2 ={
        [s]:'hello symbol'
    }
    console.log(a2[s]);
    // 写法三
    let a3 = {};
    Object.defineProperty(a3,s,{value:'hello symbol'})

    // symbol作为对象属性名，不能用点运算符，方括号中不用引号
    let a4 = {};
    a4.s = 'hello'
    a4[s]  //undefined
    a4['s'] //hello
}

// 4.遍历属性名，Symbol作为对象属性名，不能用for..in ,for..of遍历出来，也不会被Object.keys(),Object.getOwnPropertyName(),JSON.stringify()返回。
// 但一个Object.getOwnPropertySymbols方法，获得指定对象的所有Symbol属性名
{
    const obj = {};
    let a = Symbol('a');
    let b = Symbol('b');

    obj[a] = 'a';
    obj[b] = 'b';
    obj['c'] = 'c'
    obj[Symbol('d')] = 'd';

    console.log(Object.keys(obj));  //[ 'c' ]
    const objectSymbols = Object.getOwnPropertySymbols(obj);
    console.log(objectSymbols);   //[ Symbol(a), Symbol(b) ]
}

// 5.Symbol.for(),能够重用同一个Symbol值，参数接受一个字符串，先全局搜索有没有以该参数为名称的Symbol值，如果有返回这个，没有就创建新的
// Symbol.keyFor()，返回已登记的Symbol类型值得key
{
    Symbol.for('foo') === Symbol.for('foo');  //true
    Symbol('foo') === Symbol('foo');  //false
    
    let s1 = Symbol.for('foo');
    Symbol.keyFor(s1);  //'foo'

    //未登记的Symbol值
    let s2 = Symbol('foo');
    Symbol.keyFor(s2); //undefined

}
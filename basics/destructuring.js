// 1.数组的解构赋值
// es6允许按照一定的模式，从数组和对象中提取值，对变量进行赋值，这就称为解构
{
    // 这种写法属于模式匹配，只要等号两边的格式相同，就可赋值
    let [a,b,c] = [2,3,5];

    let [foo,[[bar],baz]] = [1,[[2],4]];
    foo //1
    bar //2
    baz //4

    let [,,third] = ['foo','bar','baz'];
    third //baz
    console.log(third);

    //若解构失败，则变量的值为undefined，解构失败是指右边的值个数少于左边的变量个数，不完全解构是指右边的值的个数要多于左边待赋值的变量
    let [x,y] = [];       //解构失败
    let [baa,foo2] = [1];  //解构失败
    baa //1
    foo2 //undefined       
    let [x2,y2] = [1,2,4]   //不完全解构

    // 若等号的右边不是可遍历的结构，则不能解构，报错
    // let [foo] = 1;
    // let [foo] = false;
    // let [foo] = null;
    // let [foo] = NaN;
    // let [foo] = undefined;
    // let [foo] = {};

    // 默认值,当一个成员严格等于undefined，默认值才会生效
    let [f1 = true] = [];
    f1 //true
    let [x1 = 1] = [undefined];
    x1 //1
    let [x3 = 1] = [null];
    x3 //null
    console.log(x1);

    // 默认值可以引用解构赋值的其它变量，但该变量必须已经声明
    let [x4 = 1,y4 = x4] = [];
    // let [x5 = y5,y5 = 1] = []; //报错，y is not defined
    
}

// 2.对象的解构赋值,和数组不同的是，数组是有序的，而对象无序，被赋值的变量需和对象的属性同名
// 和数组的解构赋值一样，解构失败和不完全解构的的条件相同
{
    let {foo,bar} = {bar:'name',foo:'bbb'}
    foo //bbb
    bar //name

    let {baz} = {bar:'name',foo:'bbb'}
    baz //undefined

    // 对象的解构赋值可以很方便的将现有对象的方法会属性，赋值到某个变量，但前提是知道该方法名
    let {sin,cos}  = Math;
    const {log} = console;
    log('hello');

    // 对象的解构赋值全写，因此前面的是匹配对象的属性，后面才是赋值的变量
    let {foo1:foo1,bar1:bar1} = {foo1:'naem',bar1:'bar2'}

    let obj = {first:'hello',last:'world'}
    let {first:f,last:l} = obj;
    f //hello
    l //world

    // 和数组一样，解构用于嵌套结构的对象
    let obj1 = {
        p:[
            'hello',
            {y:'world'}
        ]
    }
    let {p:[x,{y}]} = obj;

    // 默认值的解构赋值和数组相同，生效条件严格等于undefined
 }


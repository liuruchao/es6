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
    foo //undefined       
    let [x,y] = [1,2,4]   //不完全解构

    // 若等号的右边不是可遍历的结构，则不能解构，报错
    // let [foo] = 1;
    // let [foo] = false;
    // let [foo] = null;
    // let [foo] = NaN;
    // let [foo] = undefined;
    // let [foo] = {};
}


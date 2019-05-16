// 1.generator 生成器函数，内部可封装多个状态，执行后不会立即执行内部的代码，
//而是返回一个遍历器对象，通过next()调用。调用next()继续执行内部代码，yield暂停执行代码，并返回
//一个对象，这个对象的value属性值为yield后跟的表达式，done属性的值为布尔值，表示是否可遍历。
// 异步编程的解决方案

{
    function* helloGenerator(){
        console.log('一阶段');
        function bar(){
            console.log('内层函数');
        }
        //yield bar;
        yield 'hello';      //在普通函数使用yield表达式会报错
        console.log('二阶段');
        yield 'world';
        console.log('三阶段');
        return 'ending'
    }
    const hg = helloGenerator();    //返回遍历器对象，代买generator函数的内部指针
    // console.log(hg.next());
    
    for (let i of hg){
        console.log(i);
    }
}

// 2.next方法的参数
{
    function* f(){
        var reset = yield '返回值';     //yield没有返回值，或则返回值undefined
        return reset;
    }
    const g = f();
    console.log(g.next());
    console.log(g.next());
}
// next(val)里传参，参数会被当做上一个yield的返回值，所以在第一次调用next方法是传参是无效的
// 通过这样的方式可以从外部向内部传值
{
    function* f(){
        var res = yield '第一个';
        console.log('next获得yield后表达式时，已经把参数作为yield返回值传进来了',res);
    }
    const g = f();
    console.log(g.next());
    console.log(g.next('船只'));
}
// 3.for...of 循环generator函数,能够直接遍历出val,只要遇到done:true,循环就终止，因此不能返回reurn的值
{
    function* f(){
        yield 1;
        yield 2;
        yield 3;
        return 4;
    }
    const g = f();
    for (let i of g){
        console.log(i);   //1,2,3
    }
}
{
    function* f(){
        yield 1;
        yield 2;
        return 3;
        yield 4;
    }
    for (let i of f()){
        console.log(i);   //1,2
    }

    //调用生成器函数返回遍历器对象，因此以遍历器对象作为参数的方法都可传入generator()
    {
        function* numbers(){
            yield 1;
            yield 2;
            yield 3;
            return false;
        }
        let [a,b,c] = numbers();
        a; //1
        b; //2
        c; //3
        console.log('扩展运算符',[...numbers()])  //[1,2,3]
    }
}

// 4.Generator.prototype.throw(),generator函数返回的遍历器对象，有一个throw方法，在函数体外执行，后函数体内捕获错误
{
    let g = function* () {
        try{
            yield;
        }catch(e){
            console.log(e)
        }
    }

    let i = g();
    // throw参数会传入函数体内部，被catch接收
    //i.throw(new Error('接受参数，报错'));
}
// 5.return方法，终止遍历
{
    let g = function* (){
        yield 1;
        yield 2;
        yield 3;
    }
    let i = g();
    console.log(i.next());
    console.log(i.return('foo'));
    console.log(i.next());

}

//6.yield* 表达式 在一个Generator函数体内执行另一个Generator函数,
// 其实yield* 表达式后只要跟一个遍历器对象就行，只要具有iterator接口的就可以被yield遍历
{
    function* foo(){
        yield '外嵌套1';
        yield '外嵌套2';
        yield* bar();
        yield '外嵌套3';
        yield* [3,2,5,2];
        yield* 'fdsff'
    }
    function* bar(){
        yield '嵌套1';
        yield '嵌套2';
    }
    
    for (let i of foo()){
        console.log(i);
    }
    
}

// 7.实现一个状态机,,描述一个事物的状态，generator的一个小应用,
{
    let clock = (function* (){
        while(true){
            console.log('解锁');
            yield;
            console.log('加锁');
            yield;
        }
    })();   //IIFE（立即执行表达式）,固定作用域，用完就回收
    for (let i=0;i<6;i++){
        clock.next();
    }
}

// 8.默认的iterator接口是部署在数据结构的[Symbol.iterator]属性上的，因此要为一个数据结构部署遍历器接口就得编写这个属性
// 而Generator函数返回的就是个遍历器对象，所以可以直接将该函数赋值与数据结构的[Symbol.iterator]上
{
    let obj = {};
    function* gen(){
        yield 1;
        yield 2;
        yield 3;
        return 4;
    }
    obj[Symbol.iterator] = gen;
    for(let v of obj){
        console.log('generator函数',v);
    }
}

// 9.generator应用，重要的数据不应放在全局作用域下，影响性能，不够安全
{
    function choujia(count){
        //抽奖逻辑
        console.log(`还剩${count}次抽奖`);
    }

    function* resduie(count){
         while(count>0){                        //形成了一个闭包，一直引用着count变量的作用域
             count--;
             yield choujia(count);
         }
    }
    
    let start = resduie(5);
    //模拟抽奖行为
    start.next()
    start.next()
    start.next()
    start.next()
    start.next()
    start.next()
    start.next()

}

// 10.长轮询的实现
{
    function* ajax(){
        yield new Promise((resolve,reject) => {
             setTimeout(() => {
                    resolve({code:1});
             },1000);
        })
    }

    let pull = function (count) {
        // count 查询次数
        let generator = ajax();
        let step = generator.next();
        step.value.then(function(v){
            if(v.code != 0 && count <5){
                count++;
                setTimeout(function(){
                    console.log('wait');
                    pull(count);
                },1000);
            }else{
                console.log('获取最新数据')
            }
        })
    }
    pull(0);
}


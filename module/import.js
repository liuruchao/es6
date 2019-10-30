
//普通函数体
function foo(){
    //body
}

//异步函数体
async function foo(){
    //  body
}

//生成器函数体
function *foo(){
    // body
}

// 异步生成器函数体
async function *foo(){
    // body
}

var a = 1;
function foo(){
    console.log(a);
    var a = 2;
}

//foo()   //undefined
var a = 1;

function foo() {
    var o= {a:3}
    with(o) {
        var a = 2;
    }
    console.log(o.a);
    console.log(a);
}

var o2 = {
    name(){                    
        console.log('test');
     }
}

o2.name()
foo();

function* foo(){
    yield 0;
    yield 1;
    yield 2;
    yield 3;
}

for(let e of foo()){
    console.log(e)
}

function sleep(duration) {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve,duration);
    })
}
async function* foo(){
    i = 0;
    while(true) {
        await sleep(1000);
        yield i++;
    }
        
}
for await(let e of foo())
    console.log(e);


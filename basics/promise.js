// 一.基本用法
/*resolve函数将promise对象的状态从pending（未完成）变为resolved（成功）
reject函数将promise对象的状态从pending（未完成）变为rejectd（失败）
then方法接受两个回调函数作参数，第一个是状态成功，第一个状态失败*/

// 1.
function timeout(ms,val='done'){
    return new Promise((resolve,reject) => {
          setTimeout(resolve,ms,val);
    })
}

timeout(1000,'donePlus').then((value) => {
    console.log(value);
})

// 2.   执行结果 promise hi resolve ,一个宏观任务，一个微观任务
{
    let promise = new Promise((resolve,reject) =>{
    console.log('promise');
    resolve();
    });

    promise.then(() => {
        console.log('resolve');
    })

    console.log('hi')
}

//3.异步加载图片
{
    function loadImageAsync(url){
        return new Promise((resolve,reject) =>{
             const img = new Image();
             img.onload = function(){
                 resolve(img)
             };
   
             img.onerror = function(){
                 reject(new Error('Could not load image at ' + url));
             };
   
             img.src = url
   
        })
   }

//    loadImageAsync('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557046952&di=80af5623cc74439e5f3192ffe2dfb422&imgtype=jpg&er=1&src=http%3A%2F%2Fpic2.zhimg.com%2Fv2-e9276589e22f2813d863997346253005_b.jpg').then(function(img){
//        console.log('图片加载成功');
//        console.log(img)
//    },function(img){
//         console.log('图片加载失败');
//         console.log(img)
//    })
}

//4.resolve,reject的参数可以是另一个promise,此时传入promise对象的promise的状态由传入的这个promise的状态决定
{
    const p1 = new Promise(function(resolve,reject){
        // setTimeout(() => reject(new Error('fail')),3000) 
        setTimeout(() => resolve('p1状态resolve'),3000) 
    });

    const p2 = new Promise(function(resolve,reject){  
        setTimeout(() => resolve(p1),1000)
    });

    p2.then(result => console.log(result))
      .catch(error => console.log(error))
}
//5.resolv,reject的执行不会终结后面代码的执行
{
    let status = '';
    const p = new Promise((resolve,reject) =>{
        // resolve(1);
        console.log(2)
        status = resolve;
    });
    status('resolve赋值');
    p.then(function(val){
        console.log(val);
    })
}

// 6.Promise.prototype.then() 第一个参数resolve状态回调函数，第二个可选reject状态回调函数，可以链式调用
{
    new Promise((resolve,reject) =>{
        resolve()
    }).then(() => new Promise((resolve,reject) => {
         resolve();
    })).then( () => console.log('链式调用第二个then'))
}
//7.Promise.prototype.catch() 指定发生错误的回调函数
    // 包括执行错误代码后或主动抛出错误
    // 优先使用catch(),取代then(null,error())
    // catch()方法返回的仍是Promise对象,因此后面可以加then,catch回调函数，处理catch里是否有错误
{
    const promise = new Promise((resolve,reject) => {
         throw new Error('test');
    });
    promise.catch(function(error){
        console.log(error);
    }).then(function(){
        console.log('carry on')
    }).catch(function(){
        console.log('第一个catch 里抛出错误')
    })
}

// 8.promise中产生的错误，不会传递到外部，导致脚本执行中断
{
    const p = function(){
        return new Promise((resolve,reject) =>{
            resolve(x+2);  //报错,x未声明
        })
    }
    p().then(function(){
        console.log('evetythis is great');
    });

    setTimeout( () => {
        console.log('promise内部报错不会影响外部')
    },2000)
}
// 9.Promise.prototype.finally() 不管promise状态如何，都会执行的回调
{
    const promise = new Promise(() => {});
    promise
    .then(result => {/*code*/})
    .catch(error => {/*code*/})
    .finally(() => {/*code*/})
}

// 10.Promise.all() 将多个promise对象包装成新的promise 实例
// 该promise对象的状态结果和与逻辑运算符类似，只要其中有一个reject，则整个对象就为reject,并把这个reject返回值传给p的回调函数
// 当p1,p2,p3的状态都确定后，p的状态才确定，p1,p2,p3的返回值组成一个数组，传递给p的回调

{   
    const p1 = new Promise((resolve,reject) =>{
         setTimeout(function(){
             resolve('all 中p1');
         },1000);
    });
    const p2 = new Promise((resolve,reject) =>{
        setTimeout(function(){
            resolve('all 中p2');
        },2000);
   });
   const p3 = new Promise((resolve,reject) =>{
    setTimeout(function(){
        resolve('all 中p3');
    },4000);
   });
    const p = Promise.all([p1,p2,p3]);
    p.then(function(arr){
         console.log('all 中p');
         console.log(arr);
    })
}

// 11.Promise.race() 方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例
//    只有有一个promise状态变，则p的状态就跟着变，第一个变的传参数给p的回调

// 12.Promise.resolve() 和 Promise.reject() 无参数时，返回相对应状态结构的promise,有参数时，参数是promise实例的，直接返回，不是的，转为promise对象
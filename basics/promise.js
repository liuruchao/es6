// 1.基本用法
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

   loadImageAsync('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557046952&di=80af5623cc74439e5f3192ffe2dfb422&imgtype=jpg&er=1&src=http%3A%2F%2Fpic2.zhimg.com%2Fv2-e9276589e22f2813d863997346253005_b.jpg').then(function(img){
       console.log('图片加载成功');
       console.log(img)
   },function(img){
        console.log('图片加载失败');
        console.log(img)
   })
}

//4.resolve,reject的参数可以是另一个promise,此时传入promise对象的promise的状态由传入的这个promise的状态决定
{
    const p1 = new Promise(function(resolve,reject){
        setTimeout(() =>{
            reject(new Error('fail'),3000)
        })
    });

    const p2 = new Promise(funciton(resolve,reject){
         setTimeout(  )
    })
}

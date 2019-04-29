// 1.Iterator(遍历器)的概念
// iterator是一种接口，为不同数据类型提供统一的访问机制
// 任何数据结构部署了iterator接口后，就可以完成遍历操作，es6新的遍历命令for..of..

// 2.遍历器的遍历过程：
// （1）创建一个指针对象，指向当前数据结构的起始位置
// （2）不断调用指针对象next函数，返回数据结构的当前成员信息，包括value,done（布尔值，表示遍历是否结束）
{
   let it = makeIterator(['a','b']);
   console.log(it.next());      // { value: 'a', done: false }
   console.log(it.next());      // { value: 'b', done: false }
   console.log(it.next());      // { value: undefined, done: true }
   
   

   function makeIterator(arr){
       var nextIndex = 0;
       return{
           next:function(){
               return nextIndex < arr.length ?
                 {value:arr[nextIndex++],done:false}:
                 {value:undefined,done:true};
           }
       }

       
   }
}

// 3.默认的Iterator接口，如果一种数据结构部署了Iterator接口，则这种数据结构就是可遍历的
// 默认的Iterator接口部署在数据结构的Symbol.iterator属性上，只有数据结构有这种属性，则可遍历

{
    const obj = {
        a:23,
        b:23,
        [Symbol.iterator] :function(){
            return {
                next :function(){
                    return{
                        value:1,
                        done:true
                    }
                }
            }
        }
    }
    
}

// 4.原生具有的Iterator接口的数据接口
// Arry,Set,Map,String,NodeList对象,函数的arguments对象,TypedArray

{
    let arr = ['a12','b12','c12'];
    let iter = arr[Symbol.iterator]();
    console.log(iter.next());
    console.log(iter.next());
    console.log(iter.next());
    let obj = {
        data:['hello','world'],
        [Symbol.iterator]:function(){
            const self = this;
            let index = 0;
            return{
                next:function(){
                    if(index<self.data.length){
                        return {
                            value:self.data[index++],
                            done:false
                        }
                    }else{
                        return{
                            value:undefined,
                            done:true
                        }
                    }
                }
            }
        }
    }

    for (let v of obj){
        console.log(v)
    }
}
// 类似数组的对象，普通对象不行（存在数值键名和length属性），部署Iterator接口，直接引用数组的接口
// NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

// 5.调用Iterator接口的场合，默认调用接口
{
    // 1.解构赋值
    let set = new Set(['a','b','c']);
    let [x,y] = set;
    let [first,...rest] = set;
    // 2.扩展运算符
    let str = 'hello';
    [...str] //['h','e','l','l','o']

    let arr = ['b','c'];
    ['a',...arr,'d']
    // 3.yield*
    let generator = function* () {
        yield 1;
        yield* [2,3,4];
        yield 5;
      };
      
      var iterator = generator();
      
      iterator.next() // { value: 1, done: false }
      iterator.next() // { value: 2, done: false }
      iterator.next() // { value: 3, done: false }
      iterator.next() // { value: 4, done: false }
      iterator.next() // { value: 5, done: false }
      iterator.next() // { value: undefined, done: true }
    // 4.其他场合
    // 任何接受数组作为参数的场合，都用了遍历器接口
    // for ... of 
    // Array.from()
    // Map(),Set(),WeakMap(),WeakSet()
    // Promise.all()
    // Promise.race()
}

// 6.字符串Iterator接口
// 字符串是类似数组的对象，原生也具有Iterator接口
{
    let someString = 'hi';
    typeof someString[Symbol.iterator];
    let iter = someString[Symbol.iterator]();
    console.log(iter.next());
    console.log(iter.next());
    console.log(iter.next());
}

// 7.for..in 遍历键名 for..of 遍历键值 （调用遍历器接口）
// for..in 循环主要为了遍历对象设计的，不适用遍历数组

{
   function printArgs(x,y,c){
       for (let x of arguments){
           console.log(x);
       }
   }
   printArgs('参数1','参数二','参数三')
}
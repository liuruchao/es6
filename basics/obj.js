// 1.对象的属性简洁表达式
{
    const foo = 'bar';
    const bar = 'baz'
    const baz = {
        foo:foo,     //全写
        bar,          //属性简写，其实就是当属性名和赋值的变量相同时，可以只写一个
        method(){
           console.log('hello 对象简写')  //函数简写，在Vue中经常用，生命周期函数，methods
        }
    }
    console.log(baz);
    baz.method();

    function getPoint(x,y){
        let [a,b] = [x,y];
        return {a,b};
    }
    console.log(getPoint(4,3));

    // 对象属性的访问数据描述符，取值器、赋值器
    const cart = {
        _wheels:4,
        get wheels(){
            return this._wheels;
        },
        set wheels(value){
            if(value < this._wheels){
                throw new Error('数值太小了');
            }else{
                this._wheels = value;
            }
        }
    }

    console.log(cart.wheels);
    //cart.wheels = 1;   报错
}

// 2.在es6中利用方括号可动态计算属性名进行定义或取值,如果对象的属性名为非字符串，那么引擎会自动转为字符串
{
    let propKey = 'foo';
    let objKey = {name:'liu'};
    let obj = {
        ['f' + 'bao']:34,    
        [propKey] : 23,
        [objKey] :12
    }
    console.log(obj);       //{ fbao: 34, foo: 23, '[object Object]': 12 }
    console.log(obj['fbao']);
    console.log(obj[propKey]);
    console.log(obj[objKey]);
}

// 3.属性的可枚举性和遍历
// 每个对象的属性都有一个数据描述符对象，里面有关于属性值的四个特性，分别是value，writable,enumerable,configurable。
// Object.getOwnPropertyDescriptor(obj,key) 返回该对象属性的描述对象
//  Object.defineProperty(obj,key,{}) 设置该对象属性的描述对象
{
    // 设置描述符对象中的enumerable:false,禁止枚举后，遍历对象不会包括该属性
    // 四种拿到对象属性的方法
    const obj={
        name:'liu',
        age:'34',
        sex:'man'
    }
    // 1.for..in 除了遍历对象自身属性，还有其继承的属性 ，这是和其它方法不同的地方
    for(let v in obj){
        console.log('属性名',v);
    }
    // 2.Object.keys()   返回一个数组，包括该对象可枚举的属性
    console.log(Object.keys(obj));
    // 3.JSON.stringify() 只串行化对象自身的可枚举的属性,返回字符串
    console.log(JSON.stringify(obj));  //"{"name":"liu","age":"34","sex":"man"}"
    // 4.Object.assign()  忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性，返回对象
    console.log(Object.assign(obj));   //{ name: 'liu', age: '34', sex: 'man' }
}
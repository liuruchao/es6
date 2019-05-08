// 1.基本语法
// set是es6新增的数据结构，类似数组，里面的成员是唯一的，可以用来数组去重
{
    const s = new Set();
    [2,3,3,5,2,1].forEach((val,index) =>{
        s.add(val);
    });
    for(let i of s){
        console.log(i);
    }
}

//set构造函数接受的参数可以是任意的具有遍历器接口的数据结构，用来初始化
{
    // 数组
    const s1 = new Set([2,41,2,6,5,6]);
    console.log('数组为参数',s1);
    //set/map
    const s2 = new Set(new Set([2,3,4]));
    console.log('set,map参数',s2);
    //nodeList
    // const s3 = new Set(document.querySelector('p'));
    // console.log('nodelist',s3);
    //字符串
    const s4 = new Set('fsfjiefs');
    console.log('字符串参数',s4);

    //应用，数组，字符串去重
    let arr = [...new Set([2,5,6,6,2,37])];
    console.log('数组去重',arr);
    let str = [...new Set('fjsesnlffse')].join();
    console.log('字符串去重',str);
}

//set数据结构在判断插入的数据是否相等时，用的绝对相等，因此不会发生类型的转换
// 两个对象总是不相等
{
    let s = new Set();
    s.add(5);
    s.add('5');
    s.add(NaN);
    s.add(NaN);
    s.add({});
    s.add({});
    console.log(s);  //Set { 5, '5', NaN, {}, {} }
}

// 2.set实例属性和方法
// 操作数据的方法
// add(value)  添加值，返回set结构本身
// delete(value) 删除某个值，返回布尔值
// has(value)  返回布尔值，表示该值是否为set成员
// clear()  清楚所有成员值，无返回值
{
    // Set.prototype.size:返回set实例的成员总数
    const s1 = new Set([2,41,52]);
    console.log('set.size',s1.size);

    const s2 = new Set();
    s2.add({'name':'liu'}).add([4,36]).add(Symbol('foo')).add('test');
    console.log(s2);

    console.log(s2.has('test'));
    console.log(s2.has([4,36]));

    // 数组去重
    function dedupt(arr){
        return Array.from(new Set(arr));
    }
}

// 3.set实例的遍历方法
// keys() 返回键名的遍历器
// values() 返回键值得遍历器
// entries() 返回键值对的遍历器
// forEach() 使用回调函数遍历每个成员
{
    const s = new Set([3,2,{'name':'liu'},'test']);
    for(let v of s.keys()){
        console.log('Setkey',v);
    }
    for(let v of s.values()){
        console.log('Setval',v);
    }
    for(let v of s.entries()){
        console.log('Setent',v);
    }

    // Set数据结构中的成员键名和键值相同

    // set实例和数组一样，可用forEach()方法，
    // 其中数组中的index,在set中为key

    s.forEach((val,key) =>{
        console.log('set结构的forEach');
        console.log(val,key);   //val和key相同
    })
}

// 4.遍历的应用
{
    // 扩展运算符内部使用for..of
    const s1 = new Set([2,42,6]);
    let arr = [...s1];

    // 数组，字符串去重
    let arr2 = [...new Set([4,3,3,7])];

    //间接使用数组的map,filter
    let s2 = new Set([5,2,6]);
    s2 = new Set([...s2].map(function(val,index){
         return val * 2
    }));
    console.log(s2);

    // 实现并集
    let a1 = [2,4,5,7,6];
    let a2 = [1,42,7,0];
    const union = new Set([...a1,...a2]);
    console.log('并集',union);
    
    // 实现交集
    const intersect = [...new Set(a1)].filter((val) =>{
        if(new Set(a2).has(val)){
            return val;
        }
    });
    console.log('交集',intersect);

    // 实现差集
    const diff = [...new Set(a1)].filter((val) =>{
        return !new Set(a2).has(val);
    });
    console.log('差集',diff);
    
}

// 5.weakSet含义与特点
// 与set结构类似，里面存放的也是不重复的成员，与set区别是weakSet的成员只能是对象，不能是其它类型的值
// 只要其它对象不再引用该WeakSet的成员，那么垃圾回收机制会自动回收该成员对象所占内存，不考虑该对象还存在WeakSet中。
// 因此WeakSet的成员不适合引用，它会随时消失，不能遍历成员。
// add(),delete(),has()方法
{
    const a = [[1,3],[3,5]];
    const ws = new WeakSet(a);
    console.log(ws);
}


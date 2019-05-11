// 1.Map基本概念和用法
// 作为es6新加入的数据结构，与set不同的是，它是一种键值对的集合，但区别于普通对象，map的键值不局限于
// 使用字符串，也可以是其它数据类型。
// Object结构提供了“字符串-值”的对应，Map结构提供了“值-值”的对应，是一种更完善的Hash结构实现
{
    const m = new Map();
    const o = {p:'hello world'};
    const symbol = Symbol('map');
    const arr = [24];
    m.set(o,34).set(symbol,'唯一').set(arr,'fds');
    console.log(m);   //Map { { p: 'hello world' } => 34,Symbol(map) => '唯一',[ 24 ] => 'fds' }


    // 任何具有iterator接口的数据结构，且成员都是一个双元素数组的数据结构都可当成Map构造函数的参数。
    const items = [
        ['name','张三'],
        ['title','author']
    ];
    const m1 = new Map(items);
    console.log(m1);

    const set = new Set([['name','李四']]);
    const m2 = new Map(set);
    console.log(m2)

    // 对同一个键多次赋值，后面的值会覆盖前面的值
    const m3 = new Map();
    m3.set('key','aaa').set('key','bbb');
    console.log(m3.get('key'));   //bbb
    
    // 对同一个对象的引用，才视为同一个键
    const m4 = new Map();
    const a = {};
    m4.set(a,'同一个对象');
    console.log(m4.get(a));
    m4.set(['a'],'内存地址不同');
    console.log(m4.get(['a']))   //undefined
    // 虽然都是数组访问['a']这个值，但其实这两个对象的内存地址不同，因此访问不到值
    // map的键实际是跟内存地址绑定在一块，只要内存地址不同，则视为两个键
}

// 2.map实例的属性和操作数据方法
// size() 返回成员数
// set(key,value)  设置键名和值
// get(key)    获取指定键的值
// has(key)    返回布尔值，表示某个键是否在该map实例中
// delete(key)  删除某个键，成功返回true，失败返回false
// clear()      方法清除所有成员，没有返回值
{
    const map = new Map();
    const arr = [];
    map.set(arr,'test');
    console.log(map.get(arr));      //test
    console.log(map.has(arr));      //true
    console.log(map.delete(arr));   //true
    console.log(map.has(arr));      //false
    map.set('f','fa');              
    console.log(map.size);          //1
}


// 3.map的遍历方法，和set相同
// keys()  返回键名的遍历器
// values() 返回键值的遍历器
// entries() 返回所有成员的遍历器
// forEach() 遍历Map的所有成员
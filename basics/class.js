// 1.类的概念,js是面向对象的编程语言，但和其它语言基于类不同，js是基于原型的对象系统
// 基于原型对象的这种机制与基于类的区别是，通过类实例出一个对象，相当于是完全复制了一个副本，
// 而基于原型的对象系统则是让所有的实例对象与一个对象建立了连接，实例对象可以共享这个对象的所有属性方法，这个对象就是原型对象
// es6引入了class这个关键字去实现基于类，但本质是其实是实现基与原型的语法糖，就是使得原型对象的写法更清晰。
// 2. class 类不存在变量提升
// 3.经测试，class 中constructor 相当于 es5 的构造函数

{
  // class相当于原型，使用方法是new,里面constructor构造函数内定义的属性，
  // 类内部定义的方法是不可枚举的，我猜测是在class里面定义
  // 时就修改了数据描述符中的enumerable: false,并且qq.constructor == Car.prototype.constructor
  class Car {
    constructor(wheel, color) {
      this.wheel = wheel;
      this.color = color;
    }

    drive() {
      console.log("this color is " + this.color + "的车正在行驶");
    }
  }
  let qq = new Car(4, "red");
  let bm = new Car(4, "blue");
  console.log(qq);
  qq.drive();
  // 为共享的原型添加方法
  qq.__proto__.stop = function() {
    console.log("this color is " + this.color + "的车正在停止");
  };
  bm.stop();

  // 给某个属性添加取值函数和存值函数
  class plane {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }

    // get x(){
    //     return this.x;
    // }

    // set x(value){
    //     // console.log('正在赋值');\
    //     this.x = value;
    // }
  }

  let boyin = new plane(3, 5);
  boyin.x;
  boyin.x = 2;
}

// 2.静态方法
// 在类中定义的方法都会被实例继承，因此可以将类看成原型，要想让在类中定义的方法不被实例继承，则可以在前面添加关键字static,这种方法不会出现在类的prototype对象上，因此也就不会被实例继承，这样直接通过类调用，称为静态方法
{
  class Bar {
    static hello() {
      console.log("这是个静态方法");
    }
  }
  Bar.hello();

  // 静态方法可以被继承
  class Foo extends Bar {
    static helloChild() {
      console.log("这是子类静态方法");
    }
  }
  Foo.helloChild();
  Foo.hello();
}

// 3.实例对象的属性可以写在类的顶部，只要和方法同级，就可以省略前面的this值
{
  class Bar {
    //name = 'liu';      //在node 环境中报错
    //age = '34';
    constructor() {
      //
    }
  }
  // let l1 = new Bar();
  // console.log(l1);
  // let l2 = new Bar();
  // console.log(l2);
}
// 4.静态属性,calss本身的属性，目前es6只有提案,在定义的属性前加static
{
  class Bar {
    //static name = 'liu'    //node 中又报错
  }
  Bar.name = "liu"; //老写法
}

// 5.类的继承是通过extends关键字
{
  class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }

    fatherMethod() {
      console.log("这是个父类的方法");
    }
  }

  // 继承父类的子类如果不先调用super,就使用this会报错
  class ColorPoint extends Point {
    constructor(x, y, color) {
      //this.color = color;     报错
      super(x, y); //调用父类的constructor，定义子类时必须调用
      this.color = color;
    }

    childMethod() {
      console.log("这是个子类的方法");
      super.fatherMethod(); //调用父类的方法
    }
  }

  let c = new ColorPoint(2, 4, "red");
  console.log(c);
  console.log(c.childMethod());
}

// 6.super关键字，作为函数时只能用在子类的constructor中，代表父类的构造函数
// 作为对象，用在静态方法中，指向父类，用在

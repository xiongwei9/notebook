/**
 * 组合继承 = 类式继承 + 构造函数继承
 */
//父类
const SuperClass = function(name) {
    this.name = name;
    this.list = [];
};
SuperClass.prototype.getName = function() {
    console.log(this.name);
};

//子类
const SubClass = function(name, time) {
    //构造函数式继承父类name属性，实现向父类传递参数
    SuperClass.call(this, name);
    //自己的公有属性
    this.time = time;
};
//类式继承，子类原型继承父类
SubClass.prototype = new SuperClass();
//子类原型方法
SubClass.prototype.getTime = function() {
    console.log(this.time);
};

const instance1 = new SubClass('x1', 1);
const instance2 = new SubClass('x2', 2);
instance1.list.push('1');
instance2.list.push('2');
console.log(instance1.list);
console.log(instance2.list);

/**
 * 这里唯一的缺点是实现子类原型的类式继承时调用了一遍父类构造函数，而使用构造函数继承时又调用了一遍
 * 尚且不是最完美的，精彩还在后头！
 */

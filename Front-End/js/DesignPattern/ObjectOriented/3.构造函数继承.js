/**
 * 构造函数继承
 */
//父类
const SuperClass = function(id) {
    this.list = [];
    this.id = id;
};
SuperClass.prototype.showList = function() {
    console.log(this.list);
};

//子类
const SubClass = function(id) {
    //继承父类，实际上只是让父类的构造函数绑定子类的this，在这里执行了一遍
    SuperClass.call(this, id);
};

const instance1 = new SubClass(1);
const instance2 = new SubClass(2);

instance1.list.push('1');
instance2.list.push('2');
console.log(instance1.list);
console.log(instance2.list);


/**
 * 缺点：子类不能继承父类的公有属性、方法（父类原型上的一切）
 */
console.log(instance1.showList);//undefined

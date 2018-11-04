/**
 * 工厂方法模式
 * 使用一个函数或类抽象出业务实例的大致框架，然后使用它来创建具体的实例
 */
//工厂类
const Factory = function(type, content) {
    if (this instanceof Factory) {
        //返回对应产品类的实例
        return new this[type](content);
    }
    return new Factory(type, content);
};
//工厂原型中设置创建所有类型数据对象的基类
Factory.prototype = {
    constructor: Factory,
    //工厂生产的产品类
    Java: function(content) {
        this.content = content;
        (function(content) {
            // const div = document.createElement('div');
            // div.innerHTML = content;
            // div.style.border = '1px solid #000';
            // document.getElementById('container').appendChild(div);
            console.log(`I'm in Java`);
        })(content);
    },
    JavaScript: function(content) {},
    PHP: function(content) {},
};

//这样在使用的时候就可以如下使用
const js = new Factory('JavaScript', 'hello world');
const php = new Factory('PHP', 'the best language');
const java = new Factory('Java', 'NB');

console.log(java.content);


/**
 * 抽象工厂模式
 * 与上面相似，不过它创建的是类，而不是具体的实例对象
 * 与传统面向对象语言中的抽象类(abstract class)是一样的，用来生成某种类别的子类，同时规定它们必备的属性和方法
 */
const VehicleFactory = function(subType, superType) {
    if (typeof VehicleFactory[superType] !== 'function') {
        throw new Error(`cannot create this abstract class`);
    }
    const Func = function() {};
    Func.prototype = new VehicleFactory[superType]();
    subType.constructor = subType;
    subType.prototype = new Func();
    // subType.prototype.constructor = subType;
};
//工厂生产的抽象类
VehicleFactory.Car = function() {
    this.type = 'car';
};
VehicleFactory.Car.prototype = {
    constructor: VehicleFactory.Car,
    //声明抽象方法
    getPrice: function() {
        return new Error(`cannot call abstract method`);
    },
};
VehicleFactory.Bus = function() {
    this.type = 'bus';
};
VehicleFactory.Bus.prototype = {
    constructor: VehicleFactory.Bus,
    //声明抽象方法
    getPassengerNum: function() {
        return new Error(`cannot call abstract method`);
    },
};

//具体的类
const Benz = function(price) {
    this.price = price;
};
//工厂加工，实现对Car抽象类的继承
VehicleFactory(Benz, 'Car');
//实现抽象的方法
Benz.prototype.getPrice = function() {
    return this.price;
};

const benz = new Benz(100);
console.log(benz.getPrice());
console.log(benz instanceof VehicleFactory.Car);


/**
 * 还有一种“建造者模式”，似乎核心就是把一个大的对象／类分拆出多个对象／类
 * 使用的时候需要一一建造小的部分，然后组装
 */


 /**
 * 原型模式
 * 用原型实例指向创建对象的类，使用于创建新的对象的类共享原型对象的属性以及方法
 * 简单点就是利用原型对象的共享、复用功能，把一些消耗资源比较大的方法放在基类的原型中，子类通过继承将方法或属性继承下来，同时自定义子类独有方法
 * 
 * 是一种创建模式，也是一种面向对象中的继承模式吧
 */

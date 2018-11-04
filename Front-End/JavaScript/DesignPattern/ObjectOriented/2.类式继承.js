/**
 * 类式继承
 */
//父类
const SuperClass = function () {
    this.superValue = 'super';
    this.list = [];
};
SuperClass.prototype.getSuperValue = function() {
    return this.superValue;
};

//子类
const SubClass = function() {
    this.subValue = 'sub';
};
//继承父类
SubClass.prototype = new SuperClass();
//子类共有方法
SubClass.prototype.getSubValue = function() {
    return this.subValue;
};

const sub = new SubClass();
console.log(sub.getSuperValue());
console.log(sub.getSubValue());

//instanceof 通过判断对象的原型链来确定某个对象是否是某个类的实例，并不关心对象与类的自身结构
console.log(sub instanceof SuperClass);
console.log(sub instanceof SubClass);
console.log(SubClass instanceof SuperClass);//false
console.log(SubClass.prototype instanceof SuperClass);//true;


/**
 * 由于子类通过其原型prototype对父类实例化，继承了父类，这带来一些缺点：
 * 1. 父类中的共有属性都会被子类的所有实例共用，主要体现在引用类型的属性上
 * 2. 实例化对象时，无法向父类传递参数
 */
const sub2 = new SubClass();
sub2.list.push('pushed by sub2');
console.log(sub.list);//sub.list与sub2.list都等于SubClass.prototype.list，在sub2.list添加的元素会显示在sub.list内

sub2.superValue = 'super2';//这实际上是给sub2对象本身添加了superValue属性，从而覆盖了原型链（父类）上的superValue
console.log(sub.superValue);
console.log(sub2.superValue);
console.log(sub.hasOwnProperty('superValue'));//false
console.log(sub2.hasOwnProperty('superValue'));//true

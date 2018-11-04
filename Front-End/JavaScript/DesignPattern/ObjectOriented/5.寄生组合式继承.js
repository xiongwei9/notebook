/**
 * 原型式继承
 * 这个方法只不过是用来生成一个新的对象，让其原型为参数（obj对象）罢了
 * 实际上就是类式继承
 */
//对类式继承的一个封装，Object.create()函数的原形
const inheritObject = function(obj) {
    //声明一个过渡函数对象
    const Func = function() {};
    //过渡函数对象的原型继承父对象
    Func.prototype = obj;
    //返回过渡对象的一个实例，该实例的原型继承了父对象
    return new Func();
};


/**
 * 寄生式继承
 */
//声明基对象
const book = {
    name: 'JavaScript',
    alikeBook: ['CSS', 'HTML'],
};
//实际就是对原型继承的二次封装，并且在封装的过程中对继承的对象进行拓展
//寄生指的大概就是像寄生虫一样寄托于某个对象内部生长吧
const createBook = function(obj) {
    //通过原型式继承创建新对象
    const o = new inheritObject(obj);
    //拓展新对象
    o.getName = function() {
        console.log(this.name);
    };
    return o;
};
const newBook = createBook(book);
newBook.getName();


/**
 * 寄生组合式继承 = 寄生式继承 + 构造函数继承
 * 这种方式与组合继承是相似的
 * 只不过上次说过组合继承唯一的缺点是实现子类原型的类式继承时调用了一遍父类构造函数，而使用构造函数继承时又调用了一遍
 * 而现在对这个缺点做了缓和，使用一个新的无内容的过渡函数代替父类构造函数，同时使得子类的原型对象不包含多余的属性
 */
//实现类与类之间的继承
const inheritPrototype = function(SubClass, SuperClass) {
    //复制一份父类的原型副本保存在变量中
    const prototype = inheritObject(SuperClass.prototype);
    //修正因为重写子类原型导致子类的constructor属性被修改
    prototype.constructor = SubClass;
    SubClass.prototype = prototype;
};
//父类
const SuperClass = function (id) {
    this.list = [];
    this.id = id;
};
SuperClass.prototype.showList = function () {
    console.log(this.list);
};
//子类
const SubClass = function (id, name) {
    //继承父类，实际上只是让父类的构造函数绑定子类的this，在这里执行了一遍
    SuperClass.call(this, id);
    this.name = name;
};
//寄生式继承父类原型，与构造函数继承相比仅多了这一步
inheritPrototype(SubClass, SuperClass);
//子类新增原型方法
SubClass.prototype.getName = function() {
    console.log(this.name);
};

instance = new SubClass(0, '0');
instance.getName();
instance.list.push('instance');
instance.showList();

console.log(instance);

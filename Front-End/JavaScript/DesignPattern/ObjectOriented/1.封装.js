/**
 * 封装
 * 使用闭包把静态私有变量、方法封装起来
 * 同时拥有自己的私有变量、方法
 */
const Book = (function() {
    //静态私有变量
    let bookNum = 0;
    //静态私有方法
    const checkBook = function(name) {};

    //构造函数
    const _book = function(newId, newName, newPrice) {
        //创建对象的安全检测
        if (!(this instanceof _book)) {
            return new _book(newId, newName, newPrice);
        }
        //私有变量
        let name, price;
        //私有方法
        const checkId = function(id) {};
        //特权方法
        this.getName = function() {};
        this.setName = function() {};
        this.getPrice = function() {};
        this.setPrice = function() {};
        //公有属性
        this.id = newId;
        //公有方法
        this.copy = function() {};
        bookNum++;
        if (bookNum > 100) {
            throw new Error('only publish 100 books');
        }
        //构造器
        this.setName(name);
        this.setPrice(price);
    };
    _book.prototype = {
        constructor: _book,
        //静态公有属性
        isJsBook: false,
        //静态公有方法
        display: function() {},
    }
    return _book;
})();

const book = new Book();
console.log(book);

/**
 * 单例模式
 * 是只允许实例化一次的对象类。比如jQuery
 */
const jQuery = $ = {
    ajax: function() {},
    find: function() {},
};

//为单例赋予无法修改的静态变量
const conf = (function() {
    //对下面的闭包变量，只提供get方法，不提供set方法，它们就只读且无法修改了
    const vars = {
        MAX_NUM: 100,
        MIN_NUM: 0,
    };
    return {
        ajax: function() {},
        get: function(name) {
            return vars[name] ? vars[name] : null;
        },
    };
})();


/**
 * 惰性单例：有时候对于单例对象需要延迟创建（比如ajax数据到了之后再创建）
 */
const LazySingle = (function() {
    let _single = null;

    const Single = function() {
        //定义属性与方法
        return {
            property: '',
            method: function() {},
        };
    };

    //获取单例对象接口，无论接口被执行多少次，返回的单例对象都是同一个
    return function() {
        if (!_single) {
            _single = Single();
        }
        //返回单例
        return _single;
    };
})();

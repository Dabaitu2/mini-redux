/**
 *    Created by tomokokawase
 *    On 2018/4/30
 *    阿弥陀佛，没有bug!
 *    @copyright tomokokawase
 */


/**
 *
 * 简易的redux
 * @param reducer 处理器
 * @param enhancer 中间件
 *
 *  函数式编程
 *  1， 函数柯里化，函数一个一个传
 *  2.  延迟执行，真正的函数过程只有在参数全部就绪才开始执行，这一部分写在最内侧
 *
 * */

export function createStore(reducer ,enhancer) {
    // enhancer实际上是一个执行过的函数返回的另一个函数= =
    // 所以下面执行的applyMiddleware传进来时已经经过了第一个=>了
    // 执行顺序是 先enhancer(createStore) 返回函数c 再执行c(reducer)
    if (enhancer) {
        return enhancer(createStore)(reducer);
    }


    let currentState = {};
    // 一般来说初始state在createStore的时候获取，因为会在执行函数的时候初始dispatch一次，而reducer是有default的
    let currentListener = [];

    function getState() {
        return currentState;
    }
    function subscribe(listener) {
        currentListener.push(listener)
    }
    // 又一个闭包，外部没办法访问State和currentListener,只有通过dispatch来操作
    function dispatch(action) {
        // 更新相关的状态,currentState是在reducer中制定好的
        currentState = reducer(currentState, action);
        // 每一次状态变化都会引起所有监听器刷新
        currentListener.forEach(v=>v());
        return action;
    }
    dispatch({type:"@TOMOKO/SMALL-REDUX"});
    return {getState, subscribe, dispatch}
}

/**
 *
 * 中间件增强
 * 它应该是在createStore中执行完了返回之后再包装的
 * @link createStore 返回的函数在上面的enhancer中被使用了，所以参数是传入createStore以及后面的reducer
 *
 * */
export const applyMiddleware = (...middlewares) =>
    (createStore) =>  {
        return (...args) => {
            //args 就是reducer
            //这样其实算是函数柯里化，其实目的就是一个一个的传参= =
            console.log("===store初始化，首先包裹中间件===");
            const store = createStore(...args);
            let dispatch = store.dispatch;

            // 包装方法提供给中间件用来加强dispatch
            // 而且他不用subscribe
            const midApi = {
                getState: store.getState,
                dispatch: dispatch,
            };

            /**
             *  examples
             *  small-redux-thunk
             */
            const middlewareChain = middlewares.map(middleware=>middleware(midApi));
            console.log("以下为middlewareChain");
            console.log(middlewareChain[0].toString());
            console.log("以下为增强前的dispatch");
            console.log(dispatch.toString());
            // 最后的dispatch是导入中间件链的第一个dispatch
            dispatch = compose(...middlewareChain)(dispatch);
            console.log("以下为增强的dispatch(实际上是函数链的最外层)");
            console.log(dispatch.toString());

            // 闭包
            return {
                ...store,
                dispatch
            }
        };
    };


export function compose(...funcs) {
    if (funcs.length === 0) {
        // 返回一个空函数
        return arg=>arg;
    }
    if (funcs.length === 1) {
        return funcs[0];
    }
    // 嵌套函数的函数式写法
    // 第一次 func1, func2 => (...args)=>func1(func2(args))
    // 第二次 [(...args)=>func1(func2(args))， fun3] ===> [((...args) => func1(func2(args)))(func3(args))] ===> [func1(func2(func3(args)))]
    // 返回给其他函数执行 func1(func2(func3(args)))(args)
    // 返回被嵌套的函数链
    // 不要在意args是什么，他是调用中会被使用到的
    // 每一次执行后的total会变成递归的total(item(args) total(item(item(args)))
    return funcs.reduce((total, item)=>(...args)=>total(item(args)))
}

function bindActionCreator(creator, dispatch) {
    return (...args) => dispatch(creator(...args));
}

export function bindActionCreators(creators, dispatch) {
    let bound = {};
    // 返回一个由一个给定对象的自身可枚举属性组成的数组
    // 把每一个creator都用dispatch包装一下
    Object.keys(creators).forEach(v=>{
        let creator = creators[v];
        bound[v] = bindActionCreator(creator, dispatch);
    });
    return bound;
}

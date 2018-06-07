/**
 *    Created by tomokokawase
 *    On 2018/4/30
 *    阿弥陀佛，没有bug!
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from "./small-redux";


/**
 *
 * react-redux 替代用户进行this.store.state 的反复操作
 *
 * */

// 连接组件和store
// 运行过程实际上是先执行赋值，将function(a,b)赋值给app,从左至右执行，先执行app(1,2) 获得新函数(c)=>{},然后第二个括号就是执行这个函数
// 还使用了闭包特性, 在第二个函数执行中实际第一个函数应该被干掉了，但是还是能读到它的参数
const app = (a,b)=> (...args)=>{
    console.log("args");
  console.log(args);
};

app(1,2)(3);
// 正常使用
// connect([Function: mapStateToProps], [Function: mapDispatchToProps])([component should be wrapped])
export const connect = (mapStateToProps=state=>state, mapDispatchToProps={}) =>
    (WrapComponent) => {
        return class ConnectComponent extends Component {

            static contextTypes = {
                // 对来自父组件的上下文做静态限制
                store: PropTypes.object
            };

            // 这里需要在第二个参数引入上下文
            constructor(props, context) {
                console.log("以下为context");
                console.log(context);
                super(props, context);
                this.state = {
                    props: {}
                }
            }

            // 实际上redux的整个state是完全游离于组件之外的，setState也是redux自身的state
            // subscribe 只有一个作用，就是增加listener；
            // 页面刚加载时更新视图，并订阅更新事件,之后有dispatch时就可以触发update来更新数据了
            // 页面刚开始时执行一次即可
            componentDidMount() {
                const store = this.context.store;
                store.subscribe(()=>this.update());
                this.update();
            }

            // 每一次发起action,实际上还是函数内部的setState更新数据变动
            // 获取来自上下文的store并调用其中的getState方法获取state
            update() {
                // 监听器之一，也是最重要的数据更新器，开始更新数据并连接到组件上
                const store = this.context.store;
                // 按照参数定义的方式过滤映射相应的state
                const stateProps = mapStateToProps(store.getState());
                // 方法不能直接调用，需要先dispatch包装一下，不然还得在组件中写dispatch(XXX)
                // mapDispatchToProps 是一个对象
                const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch);
                // 每次setState都会触发一次生命周期改动
                this.setState({
                    // 对象展开符的用法，若对象是{a:1, b:2}的形式，展开也会这样按照键值对方式原样进入新对象
                    // constructor原有的props不变
                    props: {
                        ...this.state.props,
                        ...stateProps,
                        ...dispatchProps
                    }
                })
            }
            render() {
                return (
                    <WrapComponent {...this.state.props} />
                );
            }
        }
};




//Provider

export class Provider extends Component {
    static childContextTypes = {
        store: PropTypes.object
    };

    getChildContext(){
        // store 设定为context被直接传递
        return {store:this.store}
    }

    constructor(props) {
        super(props);
        this.store = props.store
    }
    render() {
        // children就是被夹在里面的元素
        return this.props.children
    }

}

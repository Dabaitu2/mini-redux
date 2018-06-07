/**
 *    Created by tomokokawase
 *    On 2018/5/4
 *    阿弥陀佛，没有bug!
 */
// 这里接受的实际上就是midApi
// 返回的是以【next】为参数，返回【function(action){}】的【函数】
// 所以经过compose之后还可以再传参数(dispatch)，直到再传action它才会被调用
const thunk = ({dispatch, getState}) => next => action => {
    console.log("经过thunk中间件");
    console.log(next);
    // 异步调用就执行一下异步函数
    if(typeof action === 'function') {
        return action(dispatch, getState);
    }
    console.log("thunk中间件不处理，pass");
    // 如果不是函数,说明这个action不应该由这个中间件来处理，传递给下一个
    return next(action);
};

export default thunk;
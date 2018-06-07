/**
 *    Created by tomokokawase
 *    On 2018/5/4
 *    阿弥陀佛，没有bug!
 */
// 这里接受的实际上就是midApi
const ArrayThunk = ({dispatch, getState}) => next => action => {
    // 处理数组
    console.log("经过Arraythunk中间件");

    if(Array.isArray(action)) {
        return action.forEach(v=>dispatch(v));
    }
    console.log("Arraythunk中间件不处理，pass");
    // 如果不是数组，那说明不应该由这个中间件来处理，而应该原样返回
    return next[0](action);
};

export default ArrayThunk;
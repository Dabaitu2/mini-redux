/**
 *    Created by tomokokawase
 *    On 2018/5/3
 *    阿弥陀佛，没有bug!
 */
import {createStore} from "./small-redux";

// action
export function addOne() {
    console.log("===发送action，开始触发reducer===");
    return {type:"PLUS ONE"};
}
export function subOne() {
    console.log("===发送action，开始触发reducer===");
    return {type:"SUB ONE"};
}
export function addOneAsync() {
    console.log("===发送action，开始触发reducer===");
    return dispatch => {
        setTimeout(()=>{
            dispatch(addGun())
        },2000)
    }
}




// reducer
export function counter(state = 0, action) {
    console.log("===reducer被触发===");
    switch (action.type){
        case 'PLUS ONE':
            return state += 1;
        case 'SUB ONE':
            return state -= 1;
        default:
            return 10;
    }
}


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore ,applyMiddleware} from "./MyOwnRedux/small-redux";
import {Provider} from "./MyOwnRedux/small-react-redux";
import {counter} from "./MyOwnRedux/learn-redux";
import thunk from "./MyOwnRedux/small-redux-thunk";
import ArrayThunk from "./MyOwnRedux/small-redux-arrayThunk";
// 这里的第二个参数还是一个函数，他是被applyMiddleware包装后返回的
const store = createStore(counter, applyMiddleware(thunk,ArrayThunk));
ReactDOM.render(
    (
        <Provider store={store}>
            <App />
        </Provider>
    )
    , document.getElementById('root'));
registerServiceWorker();

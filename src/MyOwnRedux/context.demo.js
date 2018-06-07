/**
 *    Created by tomokokawase
 *    On 2018/5/3
 *    阿弥陀佛，没有bug!
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types'


class Navbar extends Component {
    static contextTypes = {
        user: PropTypes.string
    };

    render() {
        return (
            <div>
                {this.context.user}的导航栏
            </div>
        );
    }

}

class Sidebar extends Component {
    static contextTypes = {
        user: PropTypes.string
    };
    render() {
        return (
            <div>
                <p>我是侧边栏</p>
                <Navbar />
            </div>
        );
    }

}



class Demo extends Component {
    // 这个是react的实验性方法
    static childContextTypes = {
        user: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {
            user: "tomoko"
        }
    }

    getChildContext = () => {
        return this.state;
    };

    render() {
        return (
            <div>
                <p>我是{this.state.user}</p>
                <Sidebar />
            </div>
        );
    }
}


export default Demo;

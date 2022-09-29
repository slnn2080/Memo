import React, {Component} from "react"

// 创建高阶组件
function withMouse(WrappedComponent) {

  // 这个组件中提供要复用的逻辑
  class Mouse extends Component {
    
    // 这个组件中提供状态 和 提供修改状态的逻辑
    state = {
      x: 0,
      y: 0
    }

    handleMouseMove = (e) => {
      this.setState({
        x: e.clientX,
        y: e.clientY
      })
    }

    // 控制鼠标状态的逻辑
    componentDidMount() {
      window.addEventListener("mouse", this.handleMouseMove)
    }

    componentWillUnmount() {
      window.removeEventListener("mouse", this.handleMouseMove)
    }


    // ui结构是通过传递进来的参数决定的
    render() {
      return (
        <WrappedComponent {...this.state}></WrappedComponent>
      )
    }
  }

  return Mouse
}
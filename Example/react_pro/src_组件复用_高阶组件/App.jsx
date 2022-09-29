import React, {Component} from "react"
import MouseUI from "./components/MouseUI"
import "./App.less"

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
      window.addEventListener("mousemove", this.handleMouseMove)
    }

    componentWillUnmount() {
      window.removeEventListener("mousemove", this.handleMouseMove)
    }


    // ui结构是通过传递进来的参数决定的
    render() {
      return (
        <WrappedComponent {...this.state} {...this.props}></WrappedComponent>
      )
    }
  }

  // 设置displayName
  Mouse.displayName = `withMouse${getDisplayName(WrappedComponent)}`
  return Mouse
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component"
}

// 获取增强后的组件
let MousePosition = withMouse(MouseUI)

export default class App extends Component {
  render() {
    return (
      <div className="app-wrap">
        <MousePosition />
      </div>
    )
  }
}
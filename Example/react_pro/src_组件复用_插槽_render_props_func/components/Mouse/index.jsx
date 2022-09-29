import React, {Component} from "react"
export default class Mouse extends Component {
  
  // 鼠标的位置的状态信息
  state = {
    x: 0,
    y: 0,
  }

  // 操作状态的方法 当鼠标移动的时候 状态会更新
  // 监听鼠标移动事件
  componentDidMount() {
    window.addEventListener("mousemove", this.handleMouseMove)
  }

  handleMouseMove = (e) => {
    this.setState({
      x: e.clientX,
      y: e.clientY
    })
  }

  render() {
    // 不渲染任何内容
    // return null
    return (
      <div>
        <h3>我是mouse组件</h3>
        <div>
          {this.props.render(this.state)}
        </div>
      </div>
    )
  }
}
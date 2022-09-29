import React, {Component} from "react"

export default class Position extends Component {

  render() {
    return (
      <div>
        鼠标当前位置: x: {this.props.x}, y: {this.props.y}
      </div>
    )
  }
}
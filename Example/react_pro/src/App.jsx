import React, {Component} from "react"
import "./App.less"

export default class App extends Component {

  state = {
    num: 0
  }

  randomNum = () => {
    let rnum = Math.floor(Math.random() * 3)
    this.setState(() => {
      return {
        num: rnum
      }
    })
  }

  // 因为两次生成的随机数可能相同 如果相同 此时没有必要重新渲染
  shouldComponentUpdate(nextProps, nextState) {

    console.log("最新state 或者说 更新后：", nextState, "更新前的state:", this.state)
    if(nextState.num === this.state.num) {
      return false
    } 
    return true
  }

  render() {
    console.log("render")
    return (
      <div className="app-wrap">
        <h3>随机数：{this.state.num}</h3>
        <button onClick={this.randomNum}>重新生成</button>
      </div>
    )
  }
}
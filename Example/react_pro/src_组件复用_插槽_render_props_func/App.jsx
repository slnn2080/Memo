import React, {Component} from "react"
import Mouse from "./components/Mouse"
import cat from "./assets/cat.jpeg"
import "./App.less"
export default class App extends Component {

  state = {
    imgW: 0,
    imgH: 0
  }

  componentDidMount() {
    let {img} = this
    this.setState({
      imgW: img.clientWidth,
      imgH: img.clientHeight
    })
  }

  render() {
    return (
      <div className="app-wrap">
        {/* 文本展示 */}
        <Mouse render={mouse => {
          return (
            <p>
              鼠标位置: {mouse.x} - {mouse.y}
            </p>
          )
        }}/>

        {/* 猫捉老鼠 */}
        <Mouse render={mouse => {
          return (
            <img ref={ c => this.img = c } src={cat} alt="cat" style={{
              position: "absolute",
              top: mouse.y - this.state.imgH / 2,
              left: mouse.x  - this.state.imgW / 2
            }} />
          )
        }}/>
      </div>
    )
  }
}
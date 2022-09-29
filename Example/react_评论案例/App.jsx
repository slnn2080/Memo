import React, {Component} from "react"
import Feature from "./components/Feature"
import Comment from "./components/Comment"
import "./App.less"
export default class App extends Component {

  state = {
    msg: []
  }

  saveData = (obj) => {
    let {msg} = this.state
    this.setState({
      msg: [obj, ...msg]
    })
  }

  render() {
    return (
      <div className="app-wrap">
        <Feature saveData={this.saveData}/>
        <Comment msg={this.state.msg}/>
      </div>
    )
  }
}
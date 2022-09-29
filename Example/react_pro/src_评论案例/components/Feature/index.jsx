import React, {Component} from "react"
import "./index.less"
export default class Feature extends Component {

  handleContent = () => {
    let {inp, area} = this
    if(inp.value.trim() === "" || area.value.trim() === "") return alert("请输入评论人 或 评论内容") 

    let msgObj = {
      auth: inp.value,
      content: area.value
    }

    this.props.saveData(msgObj)
  }
  
  render() {
    return (
      <div className="feature-wrapper">
        <div className="feature-commentator">
          <input ref={c => this.inp = c} type="text" name="commentator" placeholder="请输入评论人"/>
        </div>
        <div className="feature-comment">
          <input ref={c => this.area = c} type="textarea" name="comment" placeholder="请输入评论内容"/>
        </div>
        <div>
          <button onClick={this.handleContent}>发表评论</button>
        </div>
      </div>
    )
  }
}
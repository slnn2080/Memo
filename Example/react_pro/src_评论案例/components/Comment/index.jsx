import React, {Component} from "react"
import "./index.less"
export default class Comment extends Component {

  state = {
    hasContent: false
  }

  render() {
    console.log(this)
    return (
      <div className="comment-wrapper">
        <span className="title">评论区</span>
        <div className="comment-area">
          {
            this.props.msg.length === 0 
              ? (<div>暂无评论</div>)
              : (
                <ul>
                  {
                    this.props.msg.map((item, index) => {
                      return (
                        <li key={index}>
                          <div>{item.auth}</div>
                          <span>{item.content}</span>
                        </li>
                      )
                    })
                  }
                </ul>
              )
          }
        </div>
      </div>
    )
  }
}
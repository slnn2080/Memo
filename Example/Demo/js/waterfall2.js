class Waterfall2 {
  
  constructor(options) {
    let {el, column, gap} = options || {}
    this.el = document.querySelector(el)
    this.column = column
    this.gap = gap

    this.heightArr = []

    this.minHeight = 0
    this.minIndex = -1

    this.imgWidth = 0

    this.imgWraps = this.el.children
    

    this.initHeightArr(this.heightArr)
    this.render()
  }

  initHeightArr(arr) {
    for(let i=0; i<this.column; i++) {
      arr.push(0)
    }
  }

  render() {
    
    
  }
}

window.Waterfall2 = Waterfall2
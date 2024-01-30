# 类型需要引入konva
```js
import Konva from 'konva'
```

<br>

# 图片的Ts类型
```js
Konva.Image
```

<br>

# 舞台的类型
```js
Konva.Stage
```

### 它的配置对象类型
```js
Konva.StageConfig
```

<br>

# 图层的类型
```js
Konva.Layer
```

<br>

# 组的类型
```js
Konva.Group
```

### 它的配置对象类型
```js
Konva.NodeConfig
```

<br>

# 图形的配置对象类型呢
```js
Konva.NodeConfig

newRect(data: Konva.NodeConfig) {
  return new Konva.Rect(data)
}
```

<br>

### 所有的 Rect Text Group 等父类型
```js
import Konva from 'konva'

Konva.Node

// node 的类型是 Rect | Text 但是写联合类型会报错, 需要提供一个更加具体的类型, 这个类型就是 Node<NodeConfig>
const prevBar = prevGroup.getChildren((node: Konva.Node) => {
  console.log('node', node)
  return node.getClassName() === 'Rect'
})[0]
```
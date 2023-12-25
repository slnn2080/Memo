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
# 下载
```s
npm install vue-konva konva --save
```

<br>

# 入口文件注册
```js
import { createApp } from 'vue';
import App from './App.vue';
import VueKonva from 'vue-konva';

const app = createApp(App);
app.use(VueKonva);
app.mount('#app');
```

<br>

# 组件内引入
没有办法加上class

- v-stage
- v-layer

```html
<template>
  <v-stage :config="configKonva">
    <v-layer>
      <v-circle :config="configCircle"></v-circle>
    </v-layer>
  </v-stage>
</template>

<script>
export default {
  data() {
    return {
      configKonva: {
        width: 200,
        height: 200
      },
      configCircle: {
        x: 100,
        y: 100,
        radius: 70,
        fill: "red",
        stroke: "black",
        strokeWidth: 4
      }
    };
  }
};

</script>
```

<br>

# 内建组件
- v-rect 
- v-circle 
- v-ellipse 
- v-line 
- v-image 
- v-text 
- v-text-path 
- v-star 
- v-label 
- v-path 
- v-regular-polygon

<br>

# 自定义图形
- v-shape

```js
<template>
  <v-stage ref="stage" :config="stageSize">
    <v-layer>
      <v-shape :config="{
        sceneFunc: function(context, shape) {
          context.beginPath();
          context.moveTo(20, 50);
          context.lineTo(220, 80);
          context.quadraticCurveTo(150, 100, 260, 170);
          context.closePath();

          // special Konva.js method
          context.fillStrokeShape(shape);
        },
        fill: '#00D2FF',
        stroke: 'black',
        strokeWidth: 4
      }"/>
    </v-layer>
  </v-stage>
</template>

<script>
const width = window.innerWidth;
const height = window.innerHeight;

export default {
  data() {
    return {
      stageSize: {
        width: width,
        height: height
      }
    };
  }
};
</script>
```

<br>

# 事件
- click
- dblclick
- mouseover
- tap
- dbltap
- touchstart

- dragstart
- dragmove
- dragend

```html
<template>
  <v-stage ref="stage" :config="stageSize">
    <v-layer ref="layer">
      <v-regular-polygon
        @mousemove="handleMouseMove"
        @mouseout="handleMouseOut"
        :config="{
          x: 80,
          y: 120,
          sides: 3,
          radius: 80,
          fill: '#00D2FF',
          stroke: 'black',
          strokeWidth: 4
        }"
      />
      <v-text ref="text" :config="{
        x: 10,
        y: 10,
        fontFamily: 'Calibri',
        fontSize: 24,
        text: text,
        fill: 'black'
      }" />
    </v-layer>
  </v-stage>
</template>

<script>
const width = window.innerWidth;
const height = window.innerHeight;

export default {
  data() {
    return {
      stageSize: {
        width: width,
        height: height
      },
      text: ''
    };
  },
  methods: {
    writeMessage(message) {
      this.text = message;
    },
    handleMouseOut(event) {
      this.writeMessage('Mouseout triangle');
    },
    handleMouseMove(event) {
      const mousePos = this.$refs.stage.getNode().getPointerPosition();
      const x = mousePos.x - 190;
      const y = mousePos.y - 40;
      this.writeMessage('x: ' + x + ', y: ' + y);
    }
  }
};
</script>
```

<br>

# 图片
```html
<template>
  <v-stage ref="stage" :config="stageSize">
    <v-layer ref="layer">
      <v-image :config="{
            image: image
          }"/>
    </v-layer>
  </v-stage>
</template>

<script>
const width = window.innerWidth;
const height = window.innerHeight;

export default {
  data() {
    return {
      stageSize: {
        width: width,
        height: height
      },
      image: null
    };
  },
  created() {
    const image = new window.Image();
    image.src = "https://konvajs.org/assets/yoda.jpg";
    image.onload = () => {
      // set image only when it is loaded
      this.image = image;
    };
  }
};
</script>
```

<br>

# 过滤器
要应用过滤器，您需要缓存Konva。手动节点。您可以使用created()方法。

可能每次在updated()中更新节点的样式时都需要重新缓存节点。

```html
<template>
  <v-stage ref="stage" :config="stageSize">
    <v-layer ref="layer">
      <v-rect
        ref="rect"
        @mousemove="handleMouseMove"
        :config="{
          filters: filters,
          noise: 1,
          x: 10,
          y: 10,
          width: 50,
          height: 50,
          fill: color,
          shadowBlur: 10
        }"
      />
    </v-layer>
  </v-stage>
</template>

<script>
const width = window.innerWidth;
const height = window.innerHeight;
import Konva from 'konva';

export default {
  data() {
    return {
      stageSize: {
        width: width,
        height: height
      },
      color: 'green',
      filters: [Konva.Filters.Noise]
    };
  },
  methods: {
    handleMouseMove() {
      this.color = Konva.Util.getRandomColor();
      // 再缓存
      const rectNode = this.$refs.rect.getNode();
      // 可能需要手动重新绘制图层
      rectNode.cache();
    }
  },
  mounted() {
    const rectNode = this.$refs.rect.getNode();
    rectNode.cache();
  },
};
</script>
```

<br>

# 拖放
要对画布上的任何节点启用拖放，你只需要将draggable: true属性传递给组件。

当你拖放形状时，建议保存它的位置到你的应用程序商店。为此，您可以使用dragmove和dragend事件。

```html
<template>
  <v-stage ref="stage" :config="stageSize">
    <v-layer ref="layer">
      <v-text
        @dragstart="handleDragStart"
        @dragend="handleDragEnd"
        :config="{
          text: 'Draggable Text',
          x: 50,
          y: 50,
          draggable: true,
          fill: isDragging ? 'green' : 'black'
        }"
      />
    </v-layer>
  </v-stage>
</template>

<script>
const width = window.innerWidth;
const height = window.innerHeight;

export default {
  data() {
    return {
      stageSize: {
        width: width,
        height: height
      },
      isDragging: false
    };
  },
  methods: {
    handleDragStart() {
      this.isDragging = true;
    },
    handleDragEnd() {
      this.isDragging = false;
    }
  }
};
</script>
```

<br>

# 变换
```html
<script setup lang="ts">
import Konva from 'konva'
import { ref } from 'vue'

const width = window.innerWidth
const height = window.innerHeight

const stageSize = ref({
  width: width,
  height: height
})

const rectangles = ref([
  {
    rotation: 0,
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    scaleX: 1,
    scaleY: 1,
    fill: 'red',
    name: 'rect1',
    draggable: true
  },
  {
    rotation: 0,
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    scaleX: 1,
    scaleY: 1,
    fill: 'green',
    name: 'rect2',
    draggable: true
  }
])

const selectedShapeName = ref('')
const transformerRef = ref()
const stageRef = ref()

//  Konva 中处理图形元素变换结束时的回调函数
const handleTransformEnd = (e) => {
  // 通过 rectangles.value 数组中的 name 属性找到正在被变换的图形元素对象 rect。
  const rect = rectangles.value.find((r) => r.name === selectedShapeName.value)
  // 更新图形元素的状态，将其新的位置（x 和 y）、旋转角度（rotation）、水平缩放比例（scaleX）和垂直缩放比例（scaleY）设置为变换后的值。
  rect.x = e.target.x()
  rect.y = e.target.y()
  rect.rotation = e.target.rotation()
  rect.scaleX = e.target.scaleX()
  rect.scaleY = e.target.scaleY()

  // 用于生成随机颜色的辅助函数。这个函数返回一个随机的十六进制颜色字符串，例如 #RRGGBB。
  rect.fill = Konva.Util.getRandomColor()
}

const updateTransformer = () => {
  // 这里我们需要手动附加或分离Transformer节点
  // 获取到 Konva Transformer 组件的底层节点，以便在后续的代码中使用这个节点执行一些 Konva 特定的操作，比如手动附加或分离 Transformer 节点。
  const transformerNode = transformerRef.value.getNode()

  // 获取 Transformer 节点所属的 Konva 舞台（Stage）。在 Konva 中，每个节点（包括 Transformer）都属于一个舞台。
  const stage = transformerNode.getStage()

  // 通过这个 CSS 类名在 Konva 舞台中查找与指定类名匹配的节点。
  const selectedNode = stage.findOne('.' + selectedShapeName.value)

  // 如果所选节点已经连接，什么都不做
  // transformerNode.node() 用于获取当前 Transformer 正在操作的节点。
  if (selectedNode === transformerNode.node()) {
    return
  }

  if (selectedNode) {
    // 连接到另一个节点
    transformerNode.nodes([selectedNode])
  } else {
    // remove transformer
    transformerNode.nodes([])
  }
}

const handleStageMouseDown = (e) => {
  // 点击舞台清除选择
  if (e.target === e.target.getStage()) {
    selectedShapeName.value = ''
    updateTransformer()
    return
  }

  // 点击变压器-什么都不做
  const clickedOnTransformer = e.target.getParent().className === 'Transformer'
  if (clickedOnTransformer) {
    return
  }

  // 查找按名称单击的rect
  const name = e.target.name()
  const rect = rectangles.value.find((r) => r.name === name)
  if (rect) {
    selectedShapeName.value = name
  } else {
    selectedShapeName.value = ''
  }
  updateTransformer()
}
</script>

<template>
  <v-stage
    ref="stageRef"
    :config="stageSize"
    @mousedown="handleStageMouseDown"
    @touchstart="handleStageMouseDown"
  >
    <v-layer ref="layer">
      <v-rect
        v-for="(item, index) in rectangles"
        :key="index"
        :config="item"
        @transformend="handleTransformEnd"
      />
      <v-transformer ref="transformerRef" />
    </v-layer>
  </v-stage>
</template>

<style scoped lang="scss">
.stage-container {
  background-color: red;
}
</style>
```

# 调整 z-index
当你直接使用Konva时，你有很多方法来改变节点的顺序，如
- node.zIndex(5)
- node.moveToTop()

但不建议在使用vue框架时使用这些方法。

Vue-konva正试图按照您在模板中描述的节点顺序进行操作。所以不需要手动更改zIndex，你只需要正确地更新应用程序的数据，所以你的模板中的组件保持正确的秩序。

不要对画布组件使用zIndex。

```html
<script setup lang="ts">
import Konva from 'konva'
import { onMounted, ref } from 'vue'

const width = window.innerWidth
const height = window.innerHeight

function generateItems() {
  const items = []
  for (let i = 0; i < 10; i++) {
    items.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 50,
      id: 'node-' + i,
      fill: Konva.Util.getRandomColor(),
      draggable: true
    })
  }
  return items
}

const items = ref([])
const dragItemId = ref()
const configKonva = ref({
  width: width,
  height: height
})

const handleDragstart = (e) => {
  // 保存拖动元素:
  dragItemId.value = e.target.id()
  // 通过重新排列items数组，将当前元素移动到顶部:
  const item = items.value.find((i) => i.id === dragItemId.value)
  const index = items.value.indexOf(item)
  items.value.splice(index, 1)
  items.value.push(item)
}
const handleDragend = () => {
  dragItemId.value = null
}

onMounted(() => {
  items.value = generateItems()
})
</script>

<template>
  <div>
    <v-stage ref="stage" :config="configKonva">
      <v-layer ref="layer">
        <v-circle
          v-for="item in items"
          :key="item.id"
          :config="item"
          @dragstart="handleDragstart"
          @dragend="handleDragend"
        ></v-circle>
      </v-layer>
    </v-stage>
  </div>
</template>

<style scoped lang="scss">
.stage-container {
  background-color: red;
}
</style>
```
## 虚拟滚动列表

### 思考:
有3个盒子 A B C, 其中 B 和 C 是兄弟关系, 都属于A

A 高 300, 超出部分呈现滚动效果, B 高 1000, C 高 300

- 给C设置绝对定位
- 给A设置相对定位

当滚动的时候, C会跟着走么? 还是会保持在原地不动

<br>

**回答:**  
在滚动的时候, **C会跟着一起走**, 没有保持在原地不动

在滚动的时候 滚动的不是B么 因为B的高度是1000px 为什么C也跟着一起滚呢?

因为 overflow: auto; 设置给了A, **B将A撑开了** 滚动的时候 **滚动的是A**

C的``position: absolute;`` 是绝对定位, 它永远跟它的父级保持 ``top: 0px`` 的位置 

**而因为父级A的顶部滚动上去了, 所以C的绝对定位也跑上去了 跟着父级A一起上去了**

<br>

**代码:**  
```html
<template>
  <!-- A: height - 300 -->
  <div class="A">
    <!-- B: height - 1000 -->
    <div class="B">B: 1000</div>
    <!-- C: height - 300 -->
    <div class="C">C: 300 同A 绝对定位</div>
  </div>
</template>

<style scoped lang="scss">
.A {
  margin: 50px;
  width: 50%;
  height: 300px;
  background-color: #f6bd60;

  overflow: auto;
  position: relative;
}

.B {
  background-color: #f7ede2;
  width: 100%;
  height: 1000px;
}

.C {
  background-color: #f5cac3;
  height: 300px;
  width: 100%;

  position: absolute;
  top: 0;
  left: 0;
}
</style>
```

<br>

### 虚拟列表的思想:
有一万条数据

页面列表区域内, 开始的时候 只展示6条数据 0 ~ 5

我们发现当我们滚动的时候, DOM结构是始终只有7个, 虽然是10000万数据, 但DOM结构确只有7个

![虚拟列表01](./imgs/l1.png)

它的html结构如下
```html
<!-- scrollView 相当于 A -->
<div class="scrollView">
  <!-- virtualScrool 相当于 B -->
  <div class="virtualScrool" style="height: 500000px" />
  <!-- list 相当于 C -->
  <div class="list">
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
  </div>
</div>
```

B(virtualScrool)的高度是1000px 它超出了父级A(scrollView) 所以呈现了滚动条

如果只有C(list)的话 那么这一个div中只有这7个dom元素 不足以让父元素A呈现滚动条, 所以我们利用了B呈现出有10000条数据可以拖动的效果

**B的作用:**  
B就负责撑开A让其有滚动条的出现, B的高度为 **10000条数据 x 每条数据的高度**

<br>

### 滚动时的逻辑

![虚拟列表02](./imgs/l2.png)
![虚拟列表03](./imgs/l3.png)

当 item 1 - 3 随着滚动条的滚动 出了可视区域, 后面得有补进来了 item 10 - 13

我们需要在 父级元素的滚动回调中 需要对 visibleList 进行重新的赋值 将最新的 应该加载出来的数据加载到页面上

<br>

### 实现代码:
```s
https://www.bilibili.com/video/BV1534y1T7Hn/?spm_id_from=333.880.my_history.page.click&vd_source=66d9d28ceb1490c7b37726323336322b
```

```html
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

defineOptions({
  name: 'VListHome'
})

// 模拟 10000条 数据
const createList = () => {
  // 10000 条数据
  return Array(10000)
    .fill(0)
    .map((item, index) => {
      return {
        id: index + 1,
        content: `${index + 1}: データ内容`
      }
    })
}

// 每一条数据的高度
const itemHeight = 50

// 可视区域内展示几条 item
const visibleCount = 6

// 可视区域的高度: scrollView外层容器 和 list同高
const visibleHeight = 300

const start = ref(0)
const end = ref(visibleCount)

// virtualScrool元素的高度 (用于撑开父级元素, 呈现出滚动条)
const virtualScrollHeight = computed(() => {
  return list.value.length * itemHeight
})

// 列表的全部数据
const list = ref([])

// 可视区域渲染列表 (7条DOM结构): 根据 start 和 end 下标 来截取 list 中的数据用作渲染
const visibleList = computed(() => {
  return list.value.slice(start.value, end.value)
})

// 因为list是绝对定位 它的top的基于父元素的位置, 当父元素滚动上去后, 我希望list元素保持不动
// 方式1: list元素的位置 就是 父元素的滚动距离
const viewPositioTop = ref(0)

// 方式2: list元素的位置 start是滚动上述的元素个数 * 每个元素的高度就是list的top位置
// const viewPositioTop = computed(() => {
//   return start.value * itemHeight
// })

// 滚动回调
/*
  当我们滚动的时候 滚动出去多少 我们就要往 visibleList 中补多少新数据
*/
const scrollViewRef = ref(null)
const scrollHandler = () => {
  // 获取滚动出去的高度
  const scrollTop = scrollViewRef.value.scrollTop

  // 使用 floor 是因为 当我们滚动出去还不到一个item的高度的时候 它的结果会是0 只有元素完全滚动出去后 它才会是1 这样就能保证 没有完全滚动出去后 它还在我们的可视区域内
  // 调整 start 和 end 获取最新的 7条数据 交给 visibleList
  // start = Math.floor(头部被卷的高度 / 每条的高度)
  start.value = Math.floor(scrollTop / itemHeight)
  // 方式1: end
  // end.value = start.value + visibleCount

  // 方式2: end = Math.ceil((头部被卷的高度 + 可视区域高度) / 每条的高度) 方式2多了一条数据
  // 当滚动的时候 为了能看到下一条数据 而不是跳出来的话 我觉得方式2比较好
  end.value = Math.ceil((scrollTop + visibleHeight) / itemHeight)

  // list元素的位置为了保持不动的 方式2:
  viewPositioTop.value = scrollTop
}

onMounted(() => {
  list.value = createList()
})
</script>

<template>
  <!-- scrollView 外层容器: 须有定高 -->
  <div
    ref="scrollViewRef"
    class="scrollView"
    :style="{ height: visibleHeight + 'px' }"
    @scroll="scrollHandler"
  >
    <!-- 
      virtualScrool 用于将父级撑开 让父级具有滚动条
      其高度为 真实数据量 * 单个数据高度

       style="height: 5000px"
    -->
    <div
      class="virtualScroll"
      :style="{ height: virtualScrollHeight + 'px' }"
    />

    <!-- list 渲染数据用 list整体高度和 外层容器scrollView 同高 -->
    <div
      class="list"
      :style="{
        height: visibleHeight + 'px',
        transform: `translateY(${viewPositioTop}px)`
      }"
    >
      <!-- 如果渲染 list 的话, 相当于将10000条数据对应的真实dom节点挂载到了页面上 -->
      <div v-for="item in visibleList" :key="item.id" class="item">
        {{ item.content }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.scrollView {
  margin: 50px auto 0px;
  background-color: #f6bd60;

  width: 50%;

  // 定高
  // height: 300px;

  overflow: auto;
  position: relative;
}

.virtualScroll {
  background-color: #f7ede2;
  // height: 1000px;
}

.list {
  background-color: #f5cac3;

  // 高度 和 外层容器 scrollView 同高
  // height: 300px;
  width: 100%;

  position: absolute;
  top: 0;

  .item {
    box-sizing: border-box;
    padding: 0px 10px;
    line-height: 50px;
    background-color: #f28482;

    // 每条数据的高度
    height: 50px;
  }
}
</style>
```
### 虚拟dom
- https://zhuanlan.zhihu.com/p/136272774


### 安装 Svelet
- 1. npx degit sveltejs/template ProName
- 2. npm install
- 3. npm run dev

----------------

### main.js中
```js
import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;


// React里面有如下的写法
ReactDOM.render(<App />, document.body)
```

----------------

### svelet中的结构
- svelte组件中的后缀为 .svelte
- 其组件内部的结构为:

<script>
  js逻辑
</script>

---
这个部分直接写标签就可以 比如
<h1>
  hello, world!!!
</h1>
---

<style>
  样式逻辑
</style>

---

<script>
	let name = "sam"
</script>

<main>
	{name}
</main>

<style>
	main {
		color: red;
	}
</style>

----------------

### 组件声明 和 变量声明

- js逻辑写在 <script> 中

- html模板中使用 { 变量 } 的方式来引用变量
- { 表达式 }


> svelet的特点
- 1. 修改变量会导致引用变量的地方直接更新

----------------

### 渲染 html结构
> @html
- {@html 变量} 声明后面的变量是html结构
- 有点类似 v-html 的感觉

```js
<script>
	let name = "<p>sam</p>"
</script>

<main>
	{@html name}
</main>
```

----------------

### props
- 传递到 components 内的值被称为 properties 或 props

- 父组件:
- 通过标签属性来传递 prop

- 子组件:

> export let 变量
- 在svelte中 使用 export关键字 声明接收指定的prop变量


- 要点:
- 1. 在声明prop属性的时候可以设置默认值
- export let name = "default value"
- 如果没有指定默认值的话 我们使用该变量的时候 会报错 所以为了避免这点 我们宁可设置一个undefined

- 2. 如果将const、 class 或 function导出到component外部，那它们将会变成只读属性，然而只有函数表达式是有效的props。

- 3. 我们可以通过 <Widget {...things}/> 这种形式一次性的给组件传递多个kv

----------------

### $: 表达式

> 使用方式1: 
- 有些像 computed 当计算属性中的引用的属性发生变化的时候 该计算属性也会重新计算


> 执行时机
- 1. 组件初次渲染
- $: propname = 后面的逻辑

- 2. $: 表达式中引用的变量的值发生了变化

- 相当于定义了一个计算属性？
- 计算属性前面使用 $: 属性名 的方式定义？

```html
<script>
	import {onMount} from "svelte"
	let num = 10

	// 定义一个计算属性？ 每当num的值改变后 这的逻辑都会执行
	$: showVal = `00: ${num.toString().padStart(2, 0)}`

	// 组件挂载后的声明周期
	onMount(() => {
		setInterval(() => num -= 1, 1000)
	})
</script>

<main>
	{showVal}
</main>
```


> 使用方式2:
- $: 后面的逻辑内 只要有变量发生变化 每次组件更新都会执行 $: 后面的逻辑

- 这么看的话 还有些像 updated() {} 生命周期呢
- 这里理解的前提是 $: 后面的逻辑必须有变量发生变化

```html
<script>
  let text = "sam"
  // 每次界面更新的时候 都会输出 text 这个变量
  $: console.log(text)
</script>

<hr/>
<h3>我是Event组件的内容</h3>
<input type="text" bind:value = {text}>
<p>{text}</p>
<hr/>
```

> 使用技巧:
- 1. 点击按钮时候的逻辑
```html
<script>
  import api from "./api.js"
  let name = "world"
  const labels = ["react", "vue", "svelte"]
  let selected = ""

  // $: 后面的逻辑组件初次渲染的时候会更新次 也就是会先发一次请求 然后每当selected更新的时候 就又会发请求
  $: [res, controller] = api(selected)
</script>

{#each labels as label}
  <button
    class:active = {selected == label}
    on:click = {() => selected = label }
    -- 这里selected = label赋值后会引起一系列的变化
  >
{/each}
```

----------------

### props的传递
> 1. 父组件将数据传递到子组件
- 传递方式和 react的写法一样
```js
<Component countdown={10} />
```

> 2. 子组件使用 export 声明接收父组件传递过来的变量
```js
// 父组件传递props
<Component countdown={10} />

// 子组件声明接收
export let countdown;
```

**注意:**
- 组件在声明属性为props的时候 可以设置默认值
- 如果组件没有收到props的时候 默认值是什么样的
- export let countdown = 10

----------------

### <style>
- <style>标签块中的样式仅仅生效于component内部


> :global(...)
- 修饰符来添加全局样式。
```html
<style>
	:global(body) {
		/* 这里样式全局应用于 <body>内都 */
		margin: 0;
	}

	div :global(strong) {
		/* 这里表示全局应用于被<div>包裹的<strong>标签 */
		color: goldenrod;
	}
</style>
```

----------------

### if else if 条件判断
> {#if expression}...{/if}
> {#if expression}...{:else if expression}...{/if}
> {#if expression}...{:else}...{/if}
- 和vue的 if else if的作用一样 只是写法上有一定的区别

- 我们写在 html 模板的部分
- 结尾使用 {/if} 来关闭

```html
<script>
  // 当 变量变化的时候 html结构也会发生变化
  let loading = true
</script>

{#if loading}
<span>Loading</span>

{:else}
<span>Loaded</span>
{/if}
```

----------------

### { #each 数组 as 变量 [,index] } ... {/each} 遍历
- 我们写在 html 模板的部分
- index的部分还有key的用处 所以如果对象中有id之类的情况下 就要将id设置为key值

- 可以使用 each 块来遍历任何数组或类似数组的值，即具有length 属性的任何对象。


> key值的定义方式
> {#each arr as item, i (key)}


- 比如:
- {#each arr as item, item.id}

```html
<script>
	let arr = [1, 2, 3]
</script>

<main>
	{#each arr as item, index}
		<span>{item} - {index}</span><br>
	{/each}
</main>

<!-- 结果 -->
1 - 0
2 - 1
3 - 2
```

- each 还可以使用 {:else}子句，
- *如果列表为空*，则显示{:else} 条件下内容。
```html
{#each todos as todo}
	<p>{todo.text}</p>
{:else}
	<p>No tasks today!</p>
{/each}
```

----------------

### await block 
- 用于简化 promise 的语法
- 我们在写前端页面的时候 都会调用api svelte里面有对 await 的封装

> 格式:
- {#await expression}
- {:then 结果变量}
- {:catch 错误变量}
- {/await}

---

{#await 变量(请求结果)}

--- 还没有发起请求的阶段 也就是promise处于pending的时候会执行下面的逻辑
<span>Loading...</span>

--- 结果成功回来的阶段 promise.resolve()
{:then res}
<span>{res}</span>

--- 请求出错的阶段    promise.reject()
{:catch err}      
<span>{err}</span>

{/await}


- 当我们不关心请求为回来之前 也就是 pending 状态的话 我们还可以这么写
```html
{#await promise then value}
	<p>The value is {value}</p>
{/await}
```


- 需求:
- 下面我们完成一下 根据请求结果 显示不同的内容
```html
<script>
  let api = fetch("http://www.baidu.com").then(res => res.json())
</script>

{#await api}
  <span>Loading...</span>

{:then res}
  <span>{res}</span>

{:catch err}
  <span>{err}</span>

{/await}
```

----------------

### 标签指令
> on:事件名
> on:eventname={handler}
- 使用 on:指令来监听DOM事件。


> on:eventname|modifiers={handler}
- 使用 | 来给事件添加修饰符

> 可用的修饰符如下:
- 1. preventDefault
- 在程序运行之前调用 event.preventDefault()
- 阻止默认行为

- 2. stopPropagation
- 调用 event.stopPropagation(), 防止事件到达下一个标签
- 阻止冒泡

- 3. passive
- 改善了 touch/wheel 事件的滚动表现（Svelte会在合适的地方自动加上它）

- 4. capture
- 表示在 capture阶段而不是bubbling触发其程序

- 5. once
- 程序运行一次后删除自身

- 修饰符可以串联在一起，比如on:click|once|capture={...}。


> 设置 父组件可以监听子组件的事件
- 如果所使用的 on: 指令事件没有指定具体值，则表示 component 将会负责转发事件(*这个组件会默认往外发射事件*)，这意味着组件的使用者可以侦听该事件。

```html
<button on:click>
	组件本身将发出单击事件
</button>
```

----------------

### 事件

> 给html元素绑定事情的方式
> on:事件名
- 在标签属性中使用 on:事件名 的方式 给元素绑定事件
> <h1 on:click={表达式}>

```html
<script>
	// 下面的this 是dom元素
	function handleClick1(e) {
		console.log(this)
	}

  // 下面的this 是undefined
	const handleClick2 = () => {
		console.log(this)
	}
</script>

<main>
	<h1 on:click={handleClick2}>标题</h1>
</main>
```

> 事件的修饰符
- 修饰符可以连着写 | 修饰符1 | 修饰符2
> on:事件名 | 修饰符 = {回调}

- once: 
  - 事件只执行一次

- preventDefault: 
  - 取消默认行为


**注意**:
- once会将事件触发一次后销毁掉 如果像下面这样 我们连续用了once和preventDefault 
- once执行后会将事件销毁掉 导致preventDefault不起作用 
- a连接仍然会发生跳转

```js
<a on:click|once|preventDefault={handleClick}>
```


> 自定义事件
- 跟vue的自定义事件比较像
- 子组件使用 this.$emit派发事件 父组件在子组件的标签中使用on来监听

- svelte中也是差不多
- 1. 引入 
  - import {createEventDispatcher} from "svelte"
  - 调用createEventDispatcher()方法会得到一个 事件发射器
  - let dispath = createEventDispatcher()

- 2. 通过 dispath("事件名", 实参) 的方法发射事件

- 3. 父组件使用 on:事件名 的方式监听
  - 事件的回调里 可以拿到e 我们传递的实参可以通过 e.detail 来接收到


```html
<!-- 子组件 -->
<script>
  // 引入 可以创建自定义事件派发器的函数
  import {onMount, createEventDispatcher} from "svelte"

  // 得到 dispath
  let dispath = createEventDispatcher()

  onMount(() => {
    // 派发事件
    dispath("eventName", {name: "sam"})
  })
</script>

<hr/>
<h3>我是Event组件的内容</h3>
<hr/>


<!-- 父组件 -->
<script>
  // 引入子组件
	import Event from "./Event.svelte"
	let flag = false
</script>

<main>
	<h3>App组件</h3>

	<Event on:eventName = {(e) => {
		flag = true

    <!-- 我们传递的实参在这里 -->
		console.table(e.detail)
	}}/>
	
	{#if flag} 
		<span>结束了</span>
	{/if}
</main>
```

----------------

### bind 标签属性绑定
- vue中的v-bind
- 比如 
- input更新的时候 同步更新数据
- 当变量发生变化的时候 将数据反映到input上
- 等等

> bind:属性
> bind:目标 = {变量}
- <input type="text" bind:value={text}>
- 将input的value值绑定到变量text中

- 这样就是一个双向绑定 变量发生变化 还是 input发生变化都会同步更新

```html
<script>
  let text = "sam"
</script>

<hr/>
<h3>我是Event组件的内容</h3>
<input type="text" bind:value = {text}>
<p>{text}</p>
<hr/>
```

> bind 实现给组件上ref的操作
- 我们通过 bind:this 绑定this到变量中


> bind 还可以绑定dom属性
- 我们通过 bind:dom属性 绑定到一个变量中
```html
<div 
  class="img-wrap" 

  -- 相当于打ref
  bind:this = {div} 

  -- 相当于将该节点的clientWidth属性绑定到变量中
  bind:clientWidth = {width} >

```

> 绑定dom的常用属性
- 1. currentTime
  - 常用于radio标签

- 2. clientWidth
- 3. duration
- 4. muted 等


> 媒体标签绑定
```html
<video
	src={clip}
	bind:duration
	bind:buffered
	bind:seekable
	bind:seeking
	bind:played
	bind:ended
	bind:currentTime
	bind:paused
	bind:volume
	bind:videoWidth
	bind:videoHeight
></video>
```

> 块级标签绑定
- 块级元素具有4个只读属性的绑定，使用 的方法进行尺寸监听：

  clientWidth
  clientHeight
  offsetWidth
  offsetHeight

```html
<div
	bind:offsetWidth={width}
	bind:offsetHeight={height}
>
	<Chart {width} {height}/>
</div>
```


> 绑定class
> class:name={value}
> class:name
- 帮元素加上className 方便将变量和classname绑定
- 也就是vue中的 :class="{对象的语法}"

- 放条件为true的时候 才将className添加上去 false的时候会移除className

> 使用方式:
- 标签属性中
- class:样式名={变量名}

- 技巧:
- 如果 样式名 和 变量名 一致的时候 可以直接写 (但是不管用)
- class:active
```html
<button
  on:click={() => acitve = !acitve}
  class:active
>click me</button>
```

- 示例:
```html
<script>
	let flag = false
</script>

<main>
	<button
		on:click={() => flag = !flag}
		class:active = {flag}
	>click me</button>
</main>


<style>
	button {
		padding: 10px;
		border: 1px solid black;
		border-radius: 5px;
	}

	.active {
		background-color: orange;
	}
</style>
```

> use:fn
- use:action
- use:action={parameters}
- Action 作为一个方法用于*标签被创建时调用*。*调用destroy函数返回表示标签被销毁。*

```html
<script>
	function foo(节点, 标签属性中传递过来的实参) {
		// node已挂载在DOM中

		return {

      // 调用update方法 bar发生变化就会执行里面的逻辑
      update(bar) {
				// `bar` 已发生变更
			},

      // 调用destroy方法表示标签被销毁
			destroy() {
				// node已从DOM中移除
			}
		};
	}
</script>

<div use:foo></div>
```

----------------

### 生命周期
- 生命周期函数同vue3的方式差不多

- import {声明周期函数} from "svelet"

> 初始化:
> beforeUpdate -> onMount -> afterUpdate

> 组件更新
> beforeUpdate -> afterUpdate

> 组件销毁
> onDestroy

> tick


> onMout(cb)
- 该生命周期会在组件挂载后执行
- 该生命周期不会在ssr端执行

```js
import {onMount} from "svelte"

let name = "sam"

onMount(() => {
  setTimeout(() => name = "erin", 3000)
})
```

- 如果我们在 onMount 回调中 return () => {} 一个函数的话
- 该函数会在 组件即将要卸载之前被执行

```js
import {onMount} from "svelte"
let timer
onMount(() => {
  // 一部分逻辑
  timer = setInterval(() => {}, 2000)


  // 当我们在这里 return一个函数的时候 该函数会在 组件即将被销毁的时候执行
  return () => clearInterval(timer)
})
```


> beforeUpdate
- 会在状态(数据)更新后 组件更新之前被执行 会在onMount前执行
- beforeUpdate可以拿到dom更新之前的数据情况
- 但是要在里面加判断 如果节点存在的话 再操作
```js
beforeUpdate(() => {
  if(node) {
    console.log(xx.clientWidth)
  }
})
```

> afterUpdate
- 状态更新后 组件更新后执行
- 这里能拿到dom更新后的数值

- 上面这两个 beforeUpdate afterUpdate 还兼容了vue中的 beforeUpdate 和 updated生命周期的感觉


> onDestroy
- 在组件即将销毁的时候执行


> tick
- 返回一个promise，该promise将在应用state变更后返回resolves，或者在下一个微任务中（如果没有）更改。

```html
<script>
	import { beforeUpdate, tick } from 'svelte';

	beforeUpdate(async () => {
		console.log('the component is about to update');

		await tick();

		console.log('the component just updated');
	});
</script>
```

----------------

### Store
- Store跟vue里面的一样 用于统一的状态管理 redux
- 比如数据经常要更新可能会跨组件使用 不想掺杂太多的业务逻辑在组件中

> store API
- writable  readable  derived


> let 对象 = writable(状态)
- 作用:
- 1. 初始化store 创建状态数据
- 2. 返回的对象 有可读可写的操作store的方法

- writable用于在外部操作store中的数值
- 可读可写

- 1. 引入:
- import {writable} from "svelte/store"

- writable(状态)
- 用于初始化store中的状态 会返回一个操作这个状态的对象
```js
// 我们在store中初始化一个 数据 会返回操作这个数据的对象 可以通过该对象来调用方法操作数据
let num = writable(10)
```

- writable(状态) 返回的对象里面有3个方法
- update
- set
- subscribe
- 这3个方法都是通过 writable(状态) 返回的对象 来调用

```js
import {writable} from "svelte/store"
let countdown = writable(10)

// 我们输出 countdown 对象来看下 我们的数据呢？
console.log(countdown)

// 结果如下
set: ƒ (new_value)
subscribe: ƒ subscribe(run, invalidate = noop)
update: ƒ update(fn)
```


> 获取 store 中定义的状态
> 方式1:
- 在writable(状态)返回的对象前面使用$
```html
<script>
  import {writable} from "svelte/store"

  // 我们在store中初始化了一个countdown 里面装的10
  let countdown = writable(10)
</script>

<hr/>
<h3>我是Event组件的内容</h3>

<!-- 这里使用 $变量 的方式获取store中的数据 -->
<h3>{$countdown}</h3>
<hr/>
```


> 方式2:
- 通过 get 拿到store内的值
- 引入
- import {writable, get} from "svelte/store"
```js
import {writable, get} from "svelte/store"
let countdown = writable(10)

const val = get(countdown)
```


> 方式3:
- 通过 对象.subscribe( val => { })
- val 就是store中的数据

```js
import {writable} from "svelte/store"
let countdown = writable(10)

// 定义一个变量用于接收store中数据
let currentVal
  
countdown.subscribe(val => {
  console.log(val)
    // 10

  currentVal = val
})
```


> 对象.subscribe(val => {})
- 该方法用于操作store中的数据
- 该方法会返回一个取消订阅的对象 在合适的时候 取消订阅
```js
import {onMount, onDestroy} from "svelte"
import {writable} from "svelte/store"
const countdown = writable(0)
let currentValue

onMount(() => {
  // 得到unsubscribe对象
  const unsubscribe = 
    countdown.subscribe(val => currentValue = val)

  // 在组件销毁之前取消订阅
  return () => unsubscribe()
})

<span>{currentValue}</span>
```


> 对象.update((currentValue) => {})
- 用于修改 加工store中的数据
- 传入一个回调 回调中能拿到store中现有的数据 然后return一个结果出来

```js
import {writable} from "svelte/store"
const countdown = writable(10)

// update
countdown.update(currentValue => {
  // 这里我们可以对currentValue进行操作后 return一个新的数据出去

  // return一个新的数据
  return 9
})
```


> 对象.set(数据)
- 用于不直接操作 直接设置store中的数据
- 当我们不需要拿到store中以前的值的时候 我们直接可以使用set方法

```js
import {writable} from "svelte/store"
const countdown = writable(10)

countdown.set(9)
```

---

> let 对象 = readable(状态)
- 通过readable(状态)方式初始化的store 只能通过对象来读取store中的数据

- 作用:
- 1. 初始化store 创建状态数据
- 2. 返回的对象 有可读的方法

- 1. 引入:
- import {readable} from "svelte/store"

```js
import {writable, readable} from "svelte/store"
let countdown = readable(10)
console.log(countdown)

// 结果:
subscribe: ƒ subscribe(run, invalidate = noop)
```

- 我们发现里面只有 subscribe 那是不是说我们只能通过subscribe()方法来读取store中的数据

---

> let 新对象 = derived()
- 它可以接收一个或多个store整合后回传一个新的
- 也就是加工多个store 或者说 加工多份存在store中的数据的

- 返回的也就是一个 新的store对象

- 1. 引入
- import {derived} from "svelte/store"

- 2. 使用方式
> derived(参数1, 参数2, 参数3)

- 参数1:
- 数组格式: 用于盛放多份store数据
- store格式: 一份store数据的时候使用

- 参数2:
- 回调
- 如果是一份store数据就直接传入
- 如果是多份store数据就是一个数组

- 回调中的参数
- ([多份store数据, 多份store数据], set) => { }
  - 参数1:
  - 我们传入derived中的多份数据 使用 [ ] 的解构方式
  - 这里我们得到的就是真实的数据

  - 参数2:
  - set方法
  - set(数据) 

- 参数3:
- 初始值
- derived()如果没有传递初始值的话 最开始就是undefined


```html
<script>
  import {writable, readable, derived} from "svelte/store"

  // 创建两份store数据
  const list = readable(["sam", "erin", "nn"])
  const ids = writable([1, 2])

  // 我只想要通过ids选择到的数据
  let selectedList = derived([list, ids], ([list, ids], set) => {

    // 回调中使用set()方法 里面过滤后的数据返回出去
    set(list.filter((item, index) => ids.includes(index)))
  }, "初始值")
  console.log(selectedList)
</script>

<hr/>
<h3>我是Event组件的内容</h3>
<h3>{$selectedList}</h3>    -- erin nn
<hr/>
```


> 不同文件之间的store的使用
- 1. A文件 export ...
- 2. B文件 import { ... } from "A文件"

- 示例:
```js
import {writable, derived} from "svelte/store"

export const countdown = writable(0)
export const setCountdown = (value) => countdown.set(value)

export const countdownTimer = derived(countdown, (value, set) => {
  let timer;

  timer = setInterval(() => {
    value -= 1
    set(value)

    if(value <=0 ) clearInterval(timer)
  }, 1000)


  // 当没有人订阅的时候关闭定时器
  return () => {
    clearInterval(timer)
  }
})
```

> store抽离的写法
```html
<script>
  import {writable, readable} from "svelte/store"

  export const selected = writable("react")

  export const setSelected = (topic) => seleceted.set(topic)

  export const repos = readable({
    status: "idle", // idle loading loaded error
    items:[],
    error: null,
  }, set => {
    let currentController;

    let unsubscribe = selected.subscribe(val => {

      // 有它的话代表前面的请求还没有完成
      if(currentController) {
        currentController.abort()
      }

      set({
        status: "loading", 
        items:[],
        error: null,
      })

      const [res, controller] = api(val)
      // 呼叫api后将赋值 代表现在已经有请求了
      currentController = controller 

      res.then(data => {
        // 请求回来后将currentController置为null
        currentController = null;
        set({
          status: "loaded", 
          items:data.items,
          error: null,
        })
      }).catch(err => {
        set({
           status: "error", 
            items:[],
            error: err,
        })
      })
    })

    return () => {
      unsubscribe()
    }
  })
</script>
```

----------------

### Context
- Context中的值不是响应式的
- Context也是用来存共享数据的 但是它不是响应式的
- Context只在组件内的组件树之间共享数据

- 使用场景
- 数据几乎不会变动
- 跨组件沟通的时候

- 与store的不同之处
- 1. 没有 reactive 效果 
- 2. 需要在 Svelte 组件中使用才有效果
- 3. 只会作用在 Svelte 的组件树中
- 4. Svelte会去寻找离组件举例最近的context

- 使用方式:

- 1. 引入
- import {setContext} from "svelte"
- import {getContext} from "svelte"

- 2. 设置 context 的组件
> setContext(参数1, 参数2)
- 参数1:
- key

- 参数2:
- value

```html
<script>
  import {setContext} from "svelte"

  const user = setContext("user", {
    name: "sam",
    age: 20
  })
</>

<!-- 子组件 --> 
<Profile />
```

- 3. 获取 context 的组件
> getContext(key)
- 参数:
- key

```html
<script>
  import {getContext} from "svelte"
  const user = getContext("user")
</script>

<p>{user.name + user.age}</p>
```

----------------

### motion
- 创造互动的方式 包含了 spring tween


> tweened
- 使用方式和上面的store差不多

- 使用方式:
- 引入:
- import {tweened} from "svelte/motion"

> let 对象 = tweened(初始值, 配置项)
- 两个数值之间的transition 有点定时器的感觉

- 参数1:
- 初始值

- 参数2:
- {
  duration: 3000;   -- 毫秒数
  easing: 
}

> 取值的方式 {$对象}


> 对象.set()
- 修改初始值的吧

> 对象.update((old) => {})
- 回调中能拿到旧的值
- 需要return一个新的值


> 对象.subscribe(val => {})


```html
<script>
  import {tweened} from "svelte/motion"
  const value = tweened(10, {duration: 3000})
  // value.set(20)
  value.update(old => old + 10)
</script>

<hr/>
<h3>我是Event组件的内容</h3>
<h3>{$value}</h3>
<hr/>
```


```html
<script>
  import {tweened} from "svelte/motion"
  import {onMount} from "svelte"
  let name = "sam"

  // 刚开始组件被定义的时候 设置为1990年
  let year = tweened(1990, {
    duration: 3000
  })

  // 当组件被挂载后 设置为2020年 效果是从1990年慢慢过渡到2020年
  onMount(() => {
    setTimeout(() => year.set(2020), 2000)
  })

</script>

<hr/>
<h3>我是Event组件的内容</h3>
<h3>{$year}</h3>

<!-- 还可以这么写 -->
{Math.floor($year)}
<hr/>
```


> spring
- 让物件动画变得更加的生动 如果我们想做一些更细腻的ui上的互动的话 spring可以帮助我们很有效的做到这些
- 使用方法也跟store差不多

- 1. 引入
- import {spring} from "svelte/motion"

- 2. 使用方式:
> let 对象 = spring(参数1, 参数2)
- 参数1：
- 数据

- 参数2:
- 配置对象
- stiffness: 刚性
- damping: 摩擦系数


> 对象.set()
> 对象.subscribe(val => {})
> 对象.update((old) => {})

- 需求:
- 实现图片跟随鼠标移动的效果
```html
<script>
  import {onMount} from "svelte"

  // 图片的引入方式 在img src={imgUrl}
  let imgUrl = "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?ixlib=rb-1.2.1&auto&ramt&fit=crop&w=1962&q=80"

  let x
  let y
  let imgNode

  function handleMouse(e) {
    x = e.clientX - imgNode.width / 2
    y = e.clientY - imgNode.height / 2

    imgNode.style.left = $position.x + "px"
    imgNode.style.top = $position.y + "px"
  }
</script>

<hr/>
<h3>我是Event组件的内容</h3>
<img 
  src="{imgUrl}" 

  -- 这里利用了 ref 获取了元素的节点
  bind:this = {imgNode}
  alt="" 
  on:mousemove={handleMouse}
/>
<hr/>

<style>
  img {
    position: absolute;
    width: 150px;
    height: auto;
  }
</style>
```

- 需求:
- 实现图片跟随鼠标移动的效果 移动的过程中有一个柔和的特效
```html
<script>
  import {spring} from "svelte/motion"
  import {onMount} from "svelte"

  let imgUrl = "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?ixlib=rb-1.2.1&auto&ramt&fit=crop&w=1962&q=80"

  // 使用方式 和 store 差不多
  let position = spring({
    x: 0,
    y: 0
  }, {
    stiffness: 0.1,
    damping: 0.5
  })


  let x
  let y
  let imgNode

  function handleMouse(e) {

    // 设置值的时候 调用的set方法
    position.set({
      x: e.clientX - imgNode.width / 2,
      y: e.clientY - imgNode.height / 2
    })

    imgNode.style.left = $position.x + "px"
    imgNode.style.top = $position.y + "px"
  }
</script>

<hr/>
<h3>我是Event组件的内容</h3>
<img 
  src="{imgUrl}" 
  bind:this = {imgNode}
  alt="" 
  on:mousemove={handleMouse}
/>
<hr/>

<style>
  img {
    position: absolute;
    width: 150px;
    height: auto;
  }
</style>
```

----------------

### transtion
- 要点:
- 1. 元素的进场出场不会在第一次被挂载的时候触发

- 解决方式:
- 利用setTimeout 延迟定制200之类的

- 2. :前后不要有空格

- 应用场景:
- 1. UI中的转场效果
- 2. modal开启 和 关闭
- 3. 渐入 渐出
- 4. 放大 缩小
- 5. 平移

- svelte内建transtion:
- 1. fade   渐入渐出
- 2. blur   模糊
- 3. fly    飞入飞出
- 4. slide  平滑移动
- 5. scale  放大
- 6. draw   通常会跟svg搭配使用

- 引入:
- import {fade} from "svelte/transition"


> fade
- fade 接收以下两个参数：
- delay:
   (number, 默认值： 0) — 起始时间点（毫秒）。

- duration
   (number, 默认值： 400) — 持续时间（毫秒）。

```html
<script>
	import { fade } from 'svelte/transition';
</script>

{#if condition}
	<div transition:fade="{{delay: 250, duration: 300}}">
		fades in and out
	</div>
{/if}
```

> blur
- 接收以下参数：
- delay 
  (number, 默认值 0) — 起始点（毫秒）。

- duration 
  (number, 默认值 400) — 持续时间（毫秒）。

- easing
   (function, 默认值 cubicInOut) — easing函数。
   
- opacity
   (number, 默认值 0) - 不透明度（取值0-1）。

- amount 
  (number, 默认值 5) - 模糊范围（单位是px，这里不加单位）。


> https://www.sveltejs.cn/docs#fade_%E6%B7%A1%E5%85%A5%E6%B7%A1%E5%87%BA
- 其他的看文档吧


> 基本格式:
```html
{#if 条件}
  <div transition:fade={{配置对象}}>
    i am transition
  </div>
{/if}
```

- 进场:
  - 组件挂载的时候 属于进场

- 出场:
  - 组件被销毁的时候 属于出场




> 标签属性 transition
  在进场和出厂的时候 执行该动画

```html
<div transition:fade="{{duration: 2000}}">
  i am transition
</div>
```


> 标签属性 in: 
> 标签属性 out: 
- 通过 in 和 out 指定进场 出场的动画

```html
<div in:fade out:fly={{x:0, y:100}}>
  i am transition
</div>
```

> fly
- 要配置x y的位置


> 配置项:
- 1. delay: 延迟多久后开始执行
- 2. duration: 持续多久


> 缓动函数
- 1. 引入
- import {cubicOut} from "svelte/easing"

- 引入的欢动函数可以加在一些配置里 哪里有easing 加哪里吧

```html
<h1 in:fade out:fly={{x:0, y:100, easing: cubicOut}}>
```


> 自定义 过渡动画
- 标签属性中还是用 transition:函数名 的方式指定元素的过渡动画是谁


- 1. 自定义过渡函数 函数名会使用在标签属性中
- 2. 函数名={{配置对象}} 这个配置对象会传递到 自定义函数中 会在自定义函数第二个参数的位置出现

```html
<h1 transition:rotate={{range:180}}>
  Title
</h1>
```

- 3. 自定义函数
```js
function rotate(node, config) {

}
```
- 参数1:
- 元素节点

- 参数2: 
- 通过标签属性的 transition:rotate={{这传递进来的}}

- 返回值:
- 自定义函数的最后要return一个对象 对象中svelte希望传递出几个属性

- duration: number
- 动画的持续时间

- delay: number
- 动画的延迟时间

- easing
- 指定缓动动画 可以从 svelte/easing 中引入

- css
- 函数 返回css样式 函数中能得到 形参t 从0-1
- 0: 代表动画尚未开始
- 1: 代表动画已经结束
- 示例：
- css: t => `css样式`

- tick:
- 自己看网站总结吧


- 示例：
```html
<script>
	import {cubicOut} from "svelte/easing"

	let flag = false
	// 参数1 是节点 参数2 是空的对象 这个是配置对象要通过标签属性中的rotate={{传递进来}}
	function rotate(node, config) {

		const duration = 1000

		return {
			duration,
			easing: cubicOut,
			// 当动画结束后滚到180度
			css: t => `
				transform: rotate(${config.range * t}deg)
			`
		}

	}

	setTimeout(() => {
		flag = true
	}, 1000)

</script>

<main>
{#if flag}
	<h1 transition:rotate={{range:180}}>
		Title
	</h1>
{/if}
</main>


<style>
	main {
		color: orange;
		font-size: 20px;
	}
</style>
```

----------------

### animate

----------------

### slot

> slot
- 可以通过slot 将自定义组件传入子组件中
- 跟vue里面的slot的使用方式一样的


> 默认插槽
- 子组件:
- 使用 slot 挖坑
```html
<div>
  <slot>
    <p>这里可以写默认值</p>
  </slot>
</div>
```


- 父组件:
- 往子组件的标签体中 传入内容 会展示在 子组件的坑里面
```html
<Card>
  <p>我是父组件往子组件里面传递的内容</p>
</Card>
```

> 具名插槽
- 子组件:
<slot name="left">
  <p>这里可以写默认值</p>
</slot>

- 父组件:
<Card>
  <p slot="left">我是父组件往子组件里面传递的内容</p>
</Card>


> 作用域插槽
- 数据在子组件中 将数据传递给父组件

- 子组件:
- 子组件在slot标签内容使用 标签属性的方式传递数据
```html
<slot name="left" title="...看更多">
  <p>这里可以写默认值</p>
</slot>
```

- 父组件
- 使用 let:子组件传递过来的属性名 的方式接收
- 同时定义变量 将接收的数据保存在变量中

```html
<script>
  let data;
</script>

<Card>
  <p slot="left" let:title={data}>
    {data}
  </p>
</Card>
```

----------------

### 内建标签 和 ssr

> 内建标签

> <svelte:self />
- 递归组件
- <svelte:self /> 代表当前的组件 因为是递归 所以要确保不要进入死循环
```html
<script>
	// 声明props count 默认值为3
	export let count = 3
</script>

<main>
{#if count > 0}
	<p>countdown ... {count}</p>

  -- 给组件传递prop 每次-1 算是一个退出条件吧
	<svelte:self count={count - 1}/>
{/if}
</main>
```

> <svelte:window />
- 可对window对象做操作
- 比如:
- 我们可以将window身上的属性 取出来保存在变量中

```html
<script>
	let scrollY
  let innerWidth
</script>

<svelte:window 
  on:mousedown
  on:scroll
  on:resize
  bind:scrollY={scrollY}
  bind:innerWidth={innerWidth}
/>
```

> <svelte:body />
- 可对body对象做操作
- 没办法通过这个标签 给body添加class
- 视屏中是想在某种条件下 让body不能滚动 样式里面加了 overflow-y: hidden

- 这个标签只能绑定监听 和 获取属性等

```html
<svelte:body class:preventScroll={isOpen}/>
```

- 为了达成同样的效果 这里选择使用了 $
```js
$: {
  if(isOpen) {
    document.body.classList.add("prevent-scroll")
  } else {
    document.body.classList.remove("prevent-scroll")
  }
}
```

```css
/* 
  :global选择器: 告诉svelte不要加入hash
*/
:global(.preventScroll) {
  overflow-y: hidden;
}
```




> <svelte:head />
- 可对head做操作
- 可以在标签体中 给组件定制自己的head内容

- 当组件挂载的时候 填入head

```html
<svelte:head>
  <title>my title</title>
  <meta property="og：image" content="..." />
</svelte:head>
```

> <svelte:component />
- 可以动态引入 svelte组件
- this来指定展示哪个页面

> 格式:
- <svelte:component this={expression}/>
- 标签动态渲染component，被指定的 component 具有一个 this 属性。每当标签上的属性发生变化，该 component 将会销毁并重新创建渲染。

如果this 指向的值为false则不会呈现任何内容。


```html
<svelte:component 
  this={$model.component}
  {...$model.params}
>
```





> <svelte:options />
- 可针对组件分别指定编译器选项
```html
-- 
<svelte:options immutable={true}/>

- 将组件起个别名? <my-app> 我们可以通过这个在html模板里面调用组件
- 使用这个功能需要该config.js文件
- 在plugins - svelte - 里面添加 customElement: true
<svelte:options tag="my-app"/>
```

- 优势:
- 1. 不需要担心ssr的问题
- 2. svelte会在正确的时间点处理事件的监听器 不需要另写监听器修改变量


> ssr
- 1. require("svelte/register")
```js
require("svelte/register")
const express = require("express")
const myApp = express()
const App = require("./App.svelte").default
const {html, css, head} = App.render({ 

})

myApp.get("*", (req, res) => {
  res.send(`
    <style>
      ${css.code}
    </style>

    <html>
      ${html}
    </html>
  `)
})

myApp.listen(3333)
```

----------------

### svelteKit
- 安装方式
- npm init svelte@next my-app
  cd my-app
  npm install
  npm run dev

- 有两个特征需要介绍一下
- 1. 应用的各个页面都是 .svelte 组件
- 2. 我们把页面文件 也就是视图 放在 src/routes 文件夹下
- 放在这里面的文件会在服务器端就开始渲染


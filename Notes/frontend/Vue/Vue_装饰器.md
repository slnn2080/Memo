### 前提:
- 项目是使用 Vue-cli 搭建
- Vue-cli 的版本在2.7以上 (vue -V)

<br>

### eslint中要开启对装饰器的相关的语法检测
```js
parserOptions: {
  ecmaFeatures:{
    // 支持装饰器
    legacyDecorators: true
  }
}
```

<br>

### 示例: 装饰器中给Vue身上的属性赋值
1. 装饰器中的this 就是vue实例
2. 我们可以在请求数据的逻辑中 将请求回到的数据挂载到data options 中的一个属性上, 我们在装饰器了就可以通过this来进行中转数据
3. 如果出现请求回来的数据在 Vue组件中 或者 装饰器上 打印部出来 可以两边都使用 await
```js
export function dataInit(target, name, desciptor) {
  // 获取被装饰的函数
  const fn = desciptor.value

  // 通过描述符 重写被装饰的方法
  desciptor.value = async function() {
    await fn.apply(this, arguments)
    this.workPlaceSource = this.result
    this.copy()
  }

  // 最后需要return desciptor
  return desciptor
}
```

<br>

### 示例: 二次弹框进行删除操作
```js
//decorator.js
//假设项目中已经安装了 element-ui
import { MessageBox, Message } from 'element-ui'
/**
 * 确认框
 * @param {String} title - 标题
 * @param {String} content - 内容
 * @param {String} confirmButtonText - 确认按钮名称
 * @param {Function} callback - 确认按钮名称
 * @returns
   **/
export function confirm(title, content, confirmButtonText = '确定') {
  return function(target, name, descriptor) {
    const originValue = descriptor.value
    descriptor.value = function(...args) {
      MessageBox.confirm(content, title, {
        dangerouslyUseHTMLString: true,
        distinguishCancelAndClose: true,
        confirmButtonText: confirmButtonText
      }).then(originValue.bind(this, ...args)).catch(error => {
        if (error === 'close' || error === 'cancel') {
          Message.info('用户取消操作'))
        } else {
          Message.info(error)
        }
      })
    }
    return descriptor
  }
}



import { confirm } from '@/util/decorator'
import axios form 'axios'
export default {
name:'test',
data(){
return {
  delList: '/merchant/storeList/commitStore'
    }
  }
},
methods:{
 @confirm('删除门店','请确认是否删除门店？')
  test(id){
   const {res,data} = axios.post(this.delList,{id})
   if(res.rspCd + '' === '00000') this.$message.info('操作成功!')
  }
}


```

<br>

### 示例: 函数节流与防抖
```js
import { throttle, debounce } from 'lodash'
/**
 * 函数节流装饰器
 * @param {number} wait 节流的毫秒
 * @param {Object} options 节流选项对象
 * [options.leading=true] (boolean): 指定调用在节流开始前。
 * [options.trailing=true] (boolean): 指定调用在节流结束后。
 */
export const throttle =  function(wait, options = {}) {
  return function(target, name, descriptor) {
    descriptor.value = throttle(descriptor.value, wait, options)
  }
}

/**
 * 函数防抖装饰器
 * @param {number} wait 需要延迟的毫秒数。
 * @param {Object} options 选项对象
 * [options.leading=false] (boolean): 指定在延迟开始前调用。
 * [options.maxWait] (number): 设置 func 允许被延迟的最大值。
 * [options.trailing=true] (boolean): 指定在延迟结束后调用。
 */
export const debounce = function(wait, options = {}) {
  return function(target, name, descriptor) {
    descriptor.value = debounce(descriptor.value, wait, options)
  }
}


import {debounce} from '@/decorator'

export default {
  methods:{
    @debounce(100)
    resize(){}
  }
}

```

<br>

### 示例: loading
```js
// 没使用装饰器之前
export default {
  methods:{
    async getData() {
      const loading = Toast.loading()
      try{
        const data = await loadData()
        // 其他操作
      }catch(error){
        // 异常处理
        Toast.fail('加载失败');
      }finally{
        loading.clear()
      }  
    }
  }
}



// 使用装饰器之后
import { Toast } from 'vant'

/**
 * loading 装饰器
 * @param {*} message 提示信息
 * @param {function} errorFn 异常处理逻辑
 */
export const loading =  function(message = '加载中...', errorFn = function() {}) {
  return function(target, name, descriptor) {
    const fn = descriptor.value
    descriptor.value = async function(...rest) {
      const loading = Toast.loading({
        message: message,
        forbidClick: true
      })
      try {
        return await fn.call(this, ...rest)
      } catch (error) {
        // 在调用失败，且用户自定义失败的回调函数时，则执行
        errorFn && errorFn.call(this, error, ...rest)
        console.error(error)
      } finally {
        loading.clear()
      }
    }
  }
}



export default {
  methods:{
    @loading('加载中')
    async getData() {
      try{
        const data = await loadData()
        // 其他操作
      }catch(error){
        // 异常处理
        Toast.fail('加载失败');
      }  
    }
  }
}
```

<br>

### 示例: 确认框
当你点击删除按钮的时候，一般都需要弹出一个提示框让用户确认是否删除，这时候常规写法可能是这样的
```js
import { Dialog } from 'vant'

/**
 * 确认提示框装饰器
 * @param {*} message 提示信息
 * @param {*} title 标题
 * @param {*} cancelFn 取消回调函数
 */
export function confirm(
  message = '确定要删除数据，此操作不可回退。',
  title = '提示',
  cancelFn = function() {}
) {
  return function(target, name, descriptor) {
    const originFn = descriptor.value
    descriptor.value = async function(...rest) {
      try {
        await Dialog.confirm({
          message,
          title: title
        })
        originFn.apply(this, rest)
      } catch (error) {
        cancelFn && cancelFn(error)
      }
    }
  }
}



export default {
  methods: {
    // 可以不传参，使用默认参数
    @confirm()
    deleteData() {
      console.log('在这里做删除操作')
    }
  }
}
```
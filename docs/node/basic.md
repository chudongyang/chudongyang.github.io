#### 了解node
JavaScript 包含了 BOM(浏览器对象模型)、DOM(文档对象模型)、ECMAScript，但是 node 仅仅是一个 JavaScript 的运行时，只包含了 JavaScript 的 ECMAScript，和自身实现的一些模块。
- node 是基于 Chrome V8 引擎的 JavaScript 运行环境
- 使用了事件驱动，非阻塞的 I/O 模型，轻量又高效
- node 的包管理器 npm 是全球最大的开源库生态系统

#### node可以做什么？
- node 一般用来 写脚本、做中间层、服务端渲染（vue、react）可以实现前后端分离。
- node 可以实现高性能的 web 服务。

#### 进程和线程的区别
进程

- 进程是 CPU 资源分配的最小单位
- 单核的 CPU 在同一时间只能运行一个进程

线程
- 线程是 CPU 调度的最小单位
- 一个进程可以包括多个线程，这些线程共享这个进程的资源
- 单线程的优点：解决切换上下文时间，锁的问题，节省内存

chrome浏览器进程
- 浏览器是多进程的，一个 tab 页面就是一个进程
- 浏览器主进程，它控制其子进程的创建和销毁，浏览器界面显示(如用户交互、前进、后退等操作)，将渲染的内容绘制到用户界面上
- 渲染进程就是我们说的浏览器内核，每个 tab 页面都有一个渲染进程 负责页面的渲染、脚本执行、事件处理
- 网络进程是处理网络请求、文件访问等操作
- GPU进程是用于3D绘制
- 第三方插件进程

渲染进程
- GUI渲染线程，与 JS 引擎线程是互斥的，主要是渲染、布局和绘制页面，当发生回流和重绘时，次线程会执行
- JS引擎线程，用来解析和执行 JS 脚本的，此线程只有一个
- 事件触发线程，用来控制事件循环，当事件满足触发条件时，把事件放入 JS引擎 的队列中
- 定时器触发线程，setInterval和setTimeout所在线程
- 异步HTTP请求线程，浏览器有一个单独的线程处理AJAX请求

#### 模块化
- 模块化是按照一定的规则，把代码封装成若干个相互依赖的文件并进行组合，每个模块内部的数据都是私有的。
- 模块化的优点：(1) 有利于代码的分享、解耦和复用 (2) 团队之间并行开发，避免命名冲突 (3) 相互引用，按需加载
- 模块化的发展：(1) 自执行函数 (2) AMD 和 CMD (3) CommonJs, node 使用的模块化规范 (4) UMD (5) ESModule, js 官方定义的模块化规范

#### CommonJs 模块
node 遵循 CommonJs 模块。
- node 中的每个文件就是一个模块。其实引入模块的时候内部会默认在我们的代码外面包上一层下面的代码，这也是我们能在全局使用 module、 exports、require 等变量的原因
```js
(function(exports, module, require, __dirname, __filename) {
  // 我们自己的代码
})
```
- 实现一个简版的 CommonJs 模块原理 
  - 定义 require 方法，默认返回 module.exports
  - 定义 Module 类 (1) Module._resolveFilename 获取当前文件的绝对路径，没有找到抛出错误 (2) Module._cache 保存加载过的模块，当再次加载这个模块时，直接返回 (3) Module._extension 针对不同后缀的文件进行不同的处理 (4) Module.wrap 模块默认会在代码外层包装的函数
  - 定义 tryModuleLoad 加载模块的方法
```js
// 核心代码
const path = require('path')
const fs = require('fs')
const vm = require('vm')
function Module(absPath) {
  this.id = absPath
  this.exports = {}
}
Module._cache = {}
Module.wrap = [
  '(function(exports, module, req, __filename, __dirname) {',
  '})'
]
Module._extension = {
  '.js'(module){
    const content = fs.readFileSync(module.id, 'utf8')
    const str = Module.wrap[0] + content + Module.wrap[1]
    const fn = vm.runInThisContext(str)
    fn.call(module.exports, module.exports, module, req, module.id, path.dirname(module.id))
  },
  '.json'(module) {
    const content = fs.readFileSync(module.id, 'utf8')
    module.exports = JSON.parse(content)
  },
  '.node'() {}
}
Module._resolveFilename = function (filename) {
  const absPath = path.resolve(__dirname, filename)
  const suffixList = Object.keys(Module._extension)
  let oldPath = absPath
  let realPath
  let index = 0
  function findRealPath(absPath) {
    if (index === suffixList.length) {
      throw new Error(`${filename} module no exist`)
    }
    if (fs.existsSync(absPath)) {
      realPath = absPath
    } else {
      const suffix = suffixList[index++]
      findRealPath(oldPath + suffix)
    }
  }
  findRealPath(absPath)
  return realPath
}
function tryModuleLoad(module) {
  const suffix = path.extname(module.id)
  Module._extension[suffix](module)
}
function req(filename){
  const absPath = Module._resolveFilename(filename)
  if (Module._cache[absPath]) {
    return Module._cache[absPath].exports
  }
  const module = new Module(absPath)
  Module._cache[absPath] = module
  tryModuleLoad(module)
  return module.exports
}
```
> 注意 module.exports 和 exports 的关系，他们指向的同一个内存地址。 module.exports == exports 返回是 true。

#### node 中的 this
1. 在 node 文件中，我们直接打印 this 得到的是一个 {}(即 module.exports)，如果我们想打印出 this 指向是 global，可以在自执行函数中打印。
```js
// 在 node 的 js 文件中
console.log(this) // {}
~(function() {
  console.log(this) // global
})()
```
2. global 上经常用到的属性 process（进程）、Buffer（以字节序列的形式来表示二进制数据,其是以16进制表示的）、setInterval/clearInterval、setTimeout/clearTimeout、setImmediate/clearImmediate(宏任务)
3. 认识 process 进程对象
- process.platform 标识 Node.js 进程运行其上的操作系统平台, 比如：darwin 代表 MAC
- process.cwd() 返回 Node.js 进程的当前工作目录,返回的是根目录
- process.argv 返回包含当 Node.js 进程被启动时传入的命令行参数的数组，前两个值是固定的，第一个值是 process.execPath (即 node 进程的可执行文件的绝对路径名), 第二个值是当前执行文件的绝对路径。
```js
// 获取用户执行文件的参数对象
const result = process.argv.slice(2).reduce((memo, current, index, array) => {
  if (current.includes('--')) {
    memo[current.slice(2)] = array[index + 1]
  }
  return memo
}, {})
console.log(result)
```
- process.memoryUsage() 返回 Node.js 进程的内存使用情况的对象，可以根据内存使用做优化
- process.nextTick(callback) 一旦当前事件轮询队列的任务全部完成，在next tick队列中的所有callbacks会被依次调用.(微任务)
- process.env 返回包含用户环境的对象
```js
// 手动设置环境变量
export NODE_ENV=development // mac 系统设置
set NODE_ENV=development // window 系统设置
// 使用 node + 文件名 执行这个文件
console.log(process.env.NODE_ENV) // development
```
> 我们经常使用的 cross-env 包就能跨平台地设置及使用环境变量
4. 认识 Buffer 对象，它以16进制表示的，用于以字节序列的形式来表示二进制数据

#### node 事件环
- V8 引擎解析 JavaScript 脚本。
- 解析后的代码，调用 Node API。
- libuv 库负责 Node API 的执行。它将不同的任务分配给不同的线程，形成一个 Event Loop（事件循环），以异步的方式将任务的执行结果返回给V8引擎。
- V8 引擎再将结果返回给用户。

<img src="/nodesystem.png"  height="300" width="auto">

当 Node.js 启动后，它会初始化事件轮询；处理已提供的输入脚本，它可能会调用一些异步的 API、定时器，或者调用 process.nextTick()，然后开始处理事件循环。
下面的图表展示了事件循环操作顺序的简化概览。
```
   ┌───────────────────────────┐
┌─>│           timers          │   执行 setTimeout 和 setInterval 回调函数
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │   执行延迟到下一个循环迭代的 I/O 回调
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │   仅系统内部使用
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │  检索新的 I/O 事件;执行与 I/O 相关的回调(比如文件的读写操作)
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │   执行 setImmediate 回调函数
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │   执行一些关闭的回调函数，比如 socket.on('close', ...)
   └───────────────────────────┘
```
> 上面简图可以看出，node 中 setImmediate 的执行一直在 setTimeout 之后，除非是在 I/O 操作后 setImmediate 会比 setTimeout 先执行。
```js
// 测试一 --> setImmediate  setTimeout
fs.readFile('./a.js', function () {
    setTimeout(() => {
        console.log('setTimeout');
    }, 0);
    setImmediate(() => {
        console.log('setImmediate');
    });
}); 
// 测试二 --> nextTick1 then setTimeout2 nextTick2 setImmediate1 setImmediate2 setTimeout1
setImmediate(() => {
  console.log('setImmediate1');
  setTimeout(() => {
      console.log('setTimeout1')
  }, 0);
});
Promise.resolve().then(res=>{
  console.log('then');
})
process.nextTick(() => {
    console.log('nextTick1');
});
setTimeout(() => {
  process.nextTick(() => {
      console.log('nextTick2');
  });
  console.log('setTimeout2');
  setImmediate(() => {
      console.log('setImmediate2');
  });
}, 0);
// 测试三 --> 以浏览器中的为准 script start, async1 start, async2, promise1, script end, async1 end, promise2, setTimeout
async function async1() {
  console.log('async1 start')
  await async2() // --> 浏览器中可以认为这一步被转化成 async2().then(() => { console.log('async1 end') })
  console.log('async1 end') // 这一步的执行需要等待 async2 的 promise 函数成功后才能执行
}
async function async2() {
  console.log('async2')
}
console.log('script start')
setTimeout(function () {
  console.log('setTimeout')
})
async1()
new Promise(function (resolve) {
  console.log('promise1')
  resolve()
}).then(function () {
  console.log('promise2')
})
console.log('script end')
````
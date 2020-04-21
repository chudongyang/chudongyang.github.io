(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{667:function(e,n,s){"use strict";s.r(n);var t=s(49),a=Object(t.a)({},(function(){var e=this,n=e.$createElement,s=e._self._c||n;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h3",{attrs:{id:"npm相关"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#npm相关"}},[e._v("#")]),e._v(" npm相关")]),e._v(" "),s("p",[e._v("主要总结一些npm相关的知识点，方便以后查阅。。。")]),e._v(" "),s("h3",{attrs:{id:"npm命令"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#npm命令"}},[e._v("#")]),e._v(" npm命令")]),e._v(" "),s("ol",[s("li",[e._v("npm install 的几种方法及区别")])]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("npm i express --save / npm i express -S （安装依赖到devDependencies）\nnpm i express --save-dev / npm i express -D （安装依赖到dependencies）\nnpm i express --save-exact （锁定依赖版本号加入到dependencies）\nnpm i express --save-exact -D (锁定依赖版本号加入到devDependencies)\n")])])]),s("p",[e._v("在安装依赖之前执行下面的命令，这样所有的依赖都会锁定版本号")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("npm config set save-exact true\n")])])]),s("blockquote",[s("p",[s("code",[e._v("npm config set")]),e._v(" 命令将配置写到了 "),s("strong",[e._v("~/.npmrc")]),e._v(" 文件，可以运行 "),s("code",[e._v("npm config list")]),e._v(" 查看")])]),e._v(" "),s("ol",{attrs:{start:"2"}},[s("li",[e._v("npm shrinkwrap\n上面说的锁定依赖的版本，但这并不能完全防止意外情况的发生，因为锁定的只是最外一层的依赖，而里层依赖的模块的 package.json 有可能写的是 "),s("code",[e._v('"mongoose": "*"')]),e._v("。为了彻底锁定依赖的版本，让你的应用在任何机器上安装的都是同样版本的模块（不管嵌套多少层），通过运行 "),s("code",[e._v("npm shrinkwrap")]),e._v("，会在当前目录下产生一个 "),s("code",[e._v("npm-shrinkwrap.json")]),e._v("，里面包含了通过 node_modules 计算出的模块的依赖树及版本。上面的截图也显示：只要目录下有 "),s("code",[e._v("npm-shrinkwrap.json")]),e._v(" 则运行 "),s("code",[e._v("npm install")]),e._v(" 的时候会优先使用 "),s("code",[e._v("npm-shrinkwrap.json")]),e._v(" 进行安装，没有则使用 package.json 进行安装")])]),e._v(" "),s("blockquote",[s("p",[e._v("如果 node_modules 下存在某个模块（如直接通过 "),s("code",[e._v("npm install xxx")]),e._v(" 安装的）而 package.json 中没有，运行 "),s("code",[e._v("npm shrinkwrap")]),e._v(" 则会报错。另外，npm shrinkwrap 只会生成 dependencies 的依赖，不会生成 devDependencies 的。")])]),e._v(" "),s("p",[e._v("参考链接：")]),e._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://github.com/nswbmw/N-blog/blob/master/book/2.6%20npm%20%E4%BD%BF%E7%94%A8%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("npm注意事项"),s("OutboundLink")],1)]),e._v(" "),s("li",[e._v("https://docs.npmjs.com/cli/shrinkwrap")]),e._v(" "),s("li",[e._v("http://tech.meituan.com/npm-shrinkwrap.html")])]),e._v(" "),s("ol",{attrs:{start:"3"}},[s("li",[e._v("npm install -g typescript\n全局下载 typescript 时遇到下面这种失败的情况，可能是之前把全局的 node_modules 包删除的缘故。可以通过 "),s("code",[e._v("npm cache clean --force")]),e._v(" 清理缓存后就可以下载成功了\n"),s("img",{attrs:{src:"/npm-error.png",height:"180",width:"auto"}})])])])}),[],!1,null,null,null);n.default=a.exports}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{666:function(t,e,a){"use strict";a.r(e);var s=a(49),i=Object(s.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h3",{attrs:{id:"git相关"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git相关"}},[t._v("#")]),t._v(" git相关")]),t._v(" "),a("p",[t._v("主要总结一些git提交代码过程中不经常用到，但是偶尔需要用到但是不知道是什么的命令。。。")]),t._v(" "),a("h3",{attrs:{id:"删除已经提交的node-module文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#删除已经提交的node-module文件"}},[t._v("#")]),t._v(" 删除已经提交的node_module文件")]),t._v(" "),a("ol",[a("li",[t._v("删除仓库中不小心提交的node_module文件")])]),t._v(" "),a("ul",[a("li",[t._v("切换到要删除该文件夹的分支，在"),a("code",[t._v(".gitignore")]),t._v(" 文件中添加 node_modules")]),t._v(" "),a("li",[t._v("然后依次按顺序执行以下命令")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("git rm -r --cached node_modules\ngit add .\ngit commit -m'remove node_modules'\ngit push origin 分支名\n")])])]),a("h3",{attrs:{id:"git-commit之后，想撤销commit"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git-commit之后，想撤销commit"}},[t._v("#")]),t._v(" git commit之后，想撤销commit")]),t._v(" "),a("p",[t._v("commit撤回后，依然保留你写的代码")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("git reset --soft HEAD^\n")])])]),a("ul",[a("li",[t._v("HEAD^的意思是上一个版本，也可以写成HEAD~1，如果commit了n次，可以写成HEAD~n")]),t._v(" "),a("li",[t._v("--soft 不删除工作空间改动代码，撤销commit，不撤销git add .")])])])}),[],!1,null,null,null);e.default=i.exports}}]);
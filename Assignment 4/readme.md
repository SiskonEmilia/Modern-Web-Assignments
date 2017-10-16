# Simple Calculator

## Overview

This is a simple implentation of calculator~

## Technology stack 技术栈**

### 前端

  1. 通过HTML + CSS构建和渲染页面，实现UI效果。
  1. 通过JS实现计算器的输入逻辑，利用客户端资源得出表达式。
  1. 通过JQuery + AJAX实现与服务端交互，负责提交表达式和获取运算结果。

### 服务端

  1. 通过nodejs搭建服务器，监听本地端口，并通过express提供路由服务。
  1. 通过math.js以及对其添加的客制化符号实现科学运算以及高精度计算。

### 后台*

  1. 鉴于nodejs作为单进程IO密集型runtime，不适合计算密集型任务，考虑把计算任务下放到后台作为子进程或分发给C++完成，但因时间原因没有进行实现。

### 项目构建

  1. 通过gulp-babel实现ES6->ES5的js源码编译
  1. 通过gulp-minify-css和gulp-uglify实现监控项目源码文件并实时压缩

## Expected details

1. HTML5 + CSS3 + JS
1. Node.js**
1. Express**
1. MySQL*
1. AJAX**
1. JQuery
1. math.js
1. gulp

## Expected features

1. User-friendly Interface
1. High Accuracy Algorithm
1. Scientific Calculation
1. Cilent-Server mode
1. Account system*
1. Specific syntax*

## Versions

### V0.1

1. Construct a server based on node.js
1. Construct a basic web page
1. Connect frontend with server
1. Support High Accuracy Algorithm
1. Support Scientific Calculation
1. Use gulp to construct the project automatically

### VX.1 -- Special version (static)

1. remove AJAX/Node.js section
1. construct without cilent/server model
1. add error messages


---

* '*' --haven't achieved
* '**' --server/cilent versions only

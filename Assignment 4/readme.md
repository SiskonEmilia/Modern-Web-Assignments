# Simple Calculator

提示：通过打开HTML文件夹下的calculator.html来进入本项目

## lightspots

1. 支持高精度运算
1. 支持部分科学运算
1. 较为美观的UI和动画变换
1. 较为完备的XSS攻击应对
1. 对于文字溢出的简单处理
1. 应同学要求，针对低分辨率屏幕进行了优化：现在当版权信息栏遮挡计算器界面时，版权信息栏会暂时隐藏，如果浏览器大小重新恢复到足以容纳二者的大小时，其会重新显示
1. 应同学要求，优化了显示计算结果时点击三角函数等按钮时的逻辑
1. 应同学要求，增加mini版计算器，若您的显示屏分辨率级别小于或等于1024x768，请选用mini版计算器（通过calculatorMini.html进入）
1. 关于运算符重复的问题：我们将多余的+或-视为“正号”和“负号”，而对于其他的运算符重复，则会在运算时报错。至于在输入阶段进行处理，私以为用户可以通过配合Del达成自己的需求（也就是误输入重复运算符后删除多余的），故没有进行处理。
1. 应群内dalao的需求，现在显示运算结果时点击小数点会清空结果，相似地，点击π和e也会使得结果清空

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
1. Cilent-Server mode**
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
1. remove some functions that may lead to bugs

---

* '*' --haven't achieved
* '**' --server/cilent versions only

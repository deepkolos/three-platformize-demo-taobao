# three-platformize 淘宝小程序DEMO

[three-platformize](https://github.com/deepkolos/three-platformize)

<div>
  <img src="https://raw.githubusercontent.com/deepkolos/three-platformize-demo-taobao/master/demo.gif" width="250" alt="" style="display:inline-block;"/>
</div>

# 运行

阿里小程序开发工具打开即可运行

## 使用

如果不适用rollup做额外打包，新版本小程序开发工具需要在`mini.project.json`增加一下配置
```json
{
  "enableNodeModuleBabelTransform": true,
  "node_modules_es6_whitelist": [
    "three-platformize"
  ]
}
```

# BUG

~~目前加载GLB有问题~~, ~~已适配实现加载GLB, 还是新版本IDE和淘宝有问题~~
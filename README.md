  

# 进入项目目录
cd file<项目目录>

# 安装依赖
npm install 

# 启动服务
npm run dev 

## 发布

```bash 

# 构建生产环境
npm run build
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix 
```


## 
npm i husky -D

"gitHooks": {
    "pre-commit": "lint-staged"
  },
  "lint-staged": {
    "*.{js,vue}": [
      "vue-cli-service lint",
      "git add"
    ]
},